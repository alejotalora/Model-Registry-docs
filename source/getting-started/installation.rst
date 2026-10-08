Installation & Deployment
=========================

This guide provides the installation and deployment procedure for the
STAMM Model Registry using Docker and Docker Compose.

It covers the system requirements, environment configuration,
Docker Compose services, database initialization scripts, pre-loaded
seed data, startup and verification procedures, and common
troubleshooting scenarios.

System Requirements
-------------------

The following requirements are recommended for running the Model Registry
locally.

.. list-table::
   :header-rows: 1
   :widths: 25 25 50

   * - Requirement
     - Minimum
     - Notes
   * - Operating system
     - Windows 10/11, macOS, or Linux
     - Windows requires WSL 2 to be enabled.
   * - Docker Desktop
     - Version 24 or later
     - Docker Desktop must be running before ``docker compose up``.
   * - Docker Compose
     - Included with Docker Desktop
     - Use Docker Compose V2 syntax: ``docker compose``.
   * - RAM
     - 8 GB recommended
     - Four services run simultaneously.
   * - Disk space
     - 5 GB free
     - Required for Docker images and PostgreSQL data.
   * - Available ports
     - 80, 5432, 8080, 8501
     - If a port is occupied, the corresponding service may fail to start.
   * - WSL 2
     - Required on Windows
     - Docker Desktop uses WSL 2 as its backend on Windows.

Environment Variables
---------------------

The Model Registry uses three ``.env`` files, one for each service
configuration area. Each ``.env.example`` template must be copied to
``.env`` before starting the application.

The resulting files are:

.. code-block:: text

   model_registry/api/.env
   model_registry/backend/.env
   model_registry/postgres/.env

.. note::

   The ``.env`` files are gitignored and should not be committed.

API Configuration
~~~~~~~~~~~~~~~~~

File:

.. code-block:: text

   model_registry/api/.env

The main API environment variables are:

.. list-table::
   :class: env-table
   :header-rows: 1
   :widths: 25 32 15 28

   * - Variable
     - Default
     - Change?
     - Description
   * - ``DATABASE_URL``
     - ``postgresql://stamm:changeme@postgres:5432/stamm``
     - Only if credentials change
     - PostgreSQL connection string. The host is ``postgres``, the Docker service name.
   * - ``SECRET_KEY``
     - ``supersecretkey``
     - Yes (production)
     - Secret key used to sign JWT tokens. Change it to a long random string.
   * - ``ALGORITHM``
     - ``HS256``
     - No
     - JWT signing algorithm.
   * - ``ACCESS_TOKEN_EXPIRE_MINUTES``
     - ``60``
     - Optional
     - Access token lifetime in minutes.
   * - ``R_API_URL``
     - ``http://api_r:8581/predict``
     - No
     - URL of the R service. This value is overridden in ``docker-compose.yml``.

Backend Configuration
~~~~~~~~~~~~~~~~~~~~~

File:

.. code-block:: text

   model_registry/backend/.env

The main backend environment variables are:

.. list-table::
   :class: env-table
   :header-rows: 1
   :widths: 25 32 15 28

   * - Variable
     - Default
     - Change?
     - Description
   * - ``API_BASE_URL``
     - ``http://model-registry-api:8080/``
     - No (Docker)
     - URL where the dashboard finds the API.
   * - ``MODEL2SEEK_API_TOKEN``
     - ``your token here``
     - Only if using SEEK
     - Authentication token for FAIRDOM-SEEK.
   * - ``MODEL2SEEK_BASE_URL``
     - ``https://ibisbahub.eu``
     - Only if using SEEK
     - FAIRDOM-SEEK instance URL.

PostgreSQL Configuration
~~~~~~~~~~~~~~~~~~~~~~~~

File:

.. code-block:: text

   model_registry/postgres/.env

The PostgreSQL environment variables are:

.. list-table::
   :class: env-table
   :header-rows: 1
   :widths: 25 32 15 28

   * - Variable
     - Default
     - Change?
     - Description
   * - ``POSTGRES_DB``
     - ``stamm``
     - No
     - Database name.
   * - ``POSTGRES_USER``
     - ``stamm``
     - No
     - Database user. Must match ``DATABASE_URL``.
   * - ``POSTGRES_PASSWORD``
     - ``changeme``
     - Yes (production)
     - Database password. Must match ``DATABASE_URL``.
   * - ``POSTGRES_PORT``
     - ``5432``
     - No
     - Standard PostgreSQL port.

Docker Compose Services
-----------------------

The ``docker-compose.yml`` defines four services connected through the
shared ``ml_net`` bridge network.

.. list-table::
   :header-rows: 1
   :widths: 15 20 10 20 35

   * - Service
     - Container
     - Port
     - Depends on
     - Description
   * - ``postgres``
     - ``stamm-postgres``
     - ``5432``
     - —
     - PostgreSQL + TimescaleDB. Data persists in the ``stamm_pgdata`` volume. SQL initialization scripts are executed on first boot.
   * - ``backend``
     - ``model-registry-backend``
     - ``80``
     - —
     - Dash + Flask dashboard (Web UI) available at ``http://localhost``.
   * - ``api``
     - ``model-registry-api``
     - ``8080``
     - ``postgres`` (healthy), ``backend``
     - FastAPI REST API. Swagger UI is available at ``http://localhost:8080/docs``.
   * - ``r-api``
     - ``ml_r_api``
     - ``8501``
     - —
     - R Plumber API for R-language models including Random Forest, Cubist, CART, and M5.

Database Initialization
-----------------------

When PostgreSQL starts with an empty volume, Docker executes the SQL
files located in:

.. code-block:: text

   model_registry/postgres/docker-entrypoint-initdb.d/

The scripts are executed in alphabetical order.

Initialization scripts run only when the PostgreSQL volume is empty.
On subsequent starts, the existing database data is preserved.

Initialization Scripts
~~~~~~~~~~~~~~~~~~~~~~~

The main initialization scripts documented for the Model Registry are:

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Script
     - Purpose
   * - ``01_schema.sql``
     - Creates all 46 tables, foreign keys, indexes, constraints, and the three TimescaleDB hypertables: ``sensor_readings``, ``actuator_states``, and ``predictions``.
   * - ``02_seed.sql``
     - Inserts default users, roles (``super_admin``, ``admin``, ``modeler``, ``operator``), 108 permissions, organizations, laboratories, equipment, experiments, runs, models, and soft sensors.
   * - ``06_drift_detectors_seed.sql``
     - Seeds six drift detectors: Model Disagreement, KDQ-tree, MMD, ADWIN, PSI, and PCA-CD.
   * - ``07_drift_monitoring.sql``
     - Creates the ``drift_monitoring_results`` table and associated permissions.
   * - ``08_alerts_enrich.sql``
     - Enriches the alerts system with additional columns and indexes.
   * - ``09_detector_packs.sql``
     - Creates the ``detector_packs`` table for versioned drift-detector bundles.
   * - ``10_fl_seed.sql``
     - Creates federated learning tables: ``federations``, ``federation_participants``, and ``model_contributions``.
   * - ``11_fl_extend.sql``
     - Extends the federation schema with aggregation strategy, privacy mechanism, rounds, and status.
   * - ``12_fl_models.sql``
     - Links federations to the ``models`` table and creates federation round tracking.
   * - ``13_dynamic_models_seed.sql``
     - Creates and seeds the ``dynamic_model`` table with example mechanistic models, including an IndPenSim penicillin ODE model.

Pre-loaded Seed Data
--------------------

After the database initialization scripts have been executed, the
installation includes pre-loaded example data.

Default Users
~~~~~~~~~~~~~

Two default users are included:

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - User
     - Email
   * - Cesar Aceves
     - ``aceves@insa-toulouse.fr``
   * - Fayza Daboussi
     - ``Fayza.Daboussi@inrae.fr``

Both users are assigned the ``super_admin`` role.

Roles
~~~~~

The default roles are:

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Role
     - Description
   * - ``super_admin``
     - Full access to everything. Includes all 108 permissions.
   * - ``admin``
     - Management permissions for users, roles, and configuration.
   * - ``modeler``
     - Can create and manage models, run predictions, and view data.
   * - ``operator``
     - Can operate the system and view data, but cannot modify models.

Permissions
~~~~~~~~~~~

The seeded permission set contains 108 permissions following the
``{table_name}:{action}`` pattern.

The documented actions are:

.. code-block:: text

   read
   write
   edit

Some resources also support the ``deploy`` action, including:

.. code-block:: text

   models:deploy
   soft_sensors:deploy
   dynamic_model:deploy

Other Seed Data
~~~~~~~~~~~~~~~

Additional pre-loaded data includes:

* Organizations and laboratories.
* Equipment.
* Experiments and runs.
* Seven registered models in the IndPenSim project: LSTM, CART, RF,
  Cubist, M5, SVM, and GBM.
* Soft sensors.
* Six drift detectors.

Step-by-step Startup
--------------------

Clone and Configure
~~~~~~~~~~~~~~~~~~~

From a terminal, clone the repository and enter the project directory:

.. code-block:: console

   git clone https://github.com/stamm-4m/model-registry.git
   cd model-registry

Copy the environment templates:

.. code-block:: console

   cp model_registry/api/.env.example model_registry/api/.env
   cp model_registry/backend/.env.example model_registry/backend/.env
   cp model_registry/postgres/.env.example model_registry/postgres/.env

Start the Registry
~~~~~~~~~~~~~~~~~~

Start the Model Registry using Docker Compose:

.. code-block:: console

   docker compose up --build

The ``--build`` option is required the first time the environment is
started or after code changes that require Docker images to be rebuilt.

For subsequent starts, use:

.. code-block:: console

   docker compose up

Verify the Services
~~~~~~~~~~~~~~~~~~~

Check the status of the Docker services:

.. code-block:: console

   docker compose ps

All four services should show ``Up``.

Once the services are running, the main interfaces are:

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Interface
     - URL
   * - Dashboard
     - ``http://localhost``
   * - Swagger UI
     - ``http://localhost:8080/docs``

Stop the Registry
~~~~~~~~~~~~~~~~~

To stop the running services:

.. code-block:: console

   Ctrl + C

Data persists in the Docker volume. To restart the environment:

.. code-block:: console

   docker compose up

Troubleshooting
---------------

The following troubleshooting cases are based on issues encountered
during the installation process.

Virtualization Support Not Detected
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Symptom**

Docker Desktop shows a virtualization-related error and the Docker
Engine remains stopped.

**Cause**

Hardware virtualization (VT-x / AMD-V) is disabled in BIOS/UEFI.

**Solution**

Restart the computer and enter the BIOS/UEFI configuration
(for example, using ``F2``, ``F12``, or ``Del`` during boot).
Enable virtualization under the CPU or Advanced configuration,
then save the changes and restart.

WSL 2 Not Installed
~~~~~~~~~~~~~~~~~~~

**Symptom**

Docker Desktop fails to start, or ``wsl --status`` returns no useful
information in PowerShell.

**Cause**

Docker Desktop on Windows requires WSL 2 as its backend.

**Solution**

Open PowerShell as Administrator and run:

.. code-block:: powershell

   wsl --install

Restart the computer when prompted and verify the installation with:

.. code-block:: powershell

   wsl --status

Port Already in Use
~~~~~~~~~~~~~~~~~~~

**Symptom**

Docker Compose reports a ``port is already allocated`` error.

**Cause**

Another application is already using the required port.

**Solution**

Stop the conflicting application or change the external port mapping
in ``docker-compose.yml``.

For example:

.. code-block:: yaml

   8081:8080

This exposes the service on port ``8081`` externally.

Database Does Not Initialize
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Symptom**

The API returns errors indicating that database tables are missing.

**Cause**

The PostgreSQL volume contains data from a previous broken
initialization. Database initialization scripts run only when the
volume is empty.

**Solution**

Remove the existing Docker volume and rebuild the environment:

.. code-block:: console

   docker compose down -v
   docker compose up --build

.. warning::

   The ``-v`` option deletes the database volume and therefore deletes
   all database data.

R Service Fails to Start
~~~~~~~~~~~~~~~~~~~~~~~~

**Symptom**

The ``ml_r_api`` container exits or repeatedly restarts.

**Cause**

R package installation may time out, or the CRAN mirror may be
unavailable.

**Solution**

Check the R service logs:

.. code-block:: console

   docker compose logs r-api

If the installation timed out, rebuild the R service without cache:

.. code-block:: console

   docker compose build --no-cache r-api

Docker Desktop Is Not Running
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Symptom**

Docker commands return a ``Cannot connect to the Docker daemon`` error.

**Solution**

Open Docker Desktop, wait until the Docker Engine shows a running
status, and then retry the command.