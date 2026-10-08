API Reference
=============

This section provides the endpoint catalog for the STAMM Model Registry
REST API.

The API is implemented with FastAPI and is exposed on port ``8080``.

The current API exposes 27 hand-written endpoints covering authentication,
project management, model operations, run time-series access, detector-pack
management, and prediction workflow triggering.

The endpoint catalog is divided into:

* Hand-written endpoints for authentication, projects, models, runs,
  detector packs, and prediction workflow triggering.
* Auto-generated CRUD endpoints for the database tables.

For interactive testing and complete OpenAPI details, use Swagger UI:

.. code-block:: text

   http://localhost:8080/docs


Hand-Written Endpoints
----------------------

The following endpoints are explicitly implemented by the Model Registry
application.


Authentication
~~~~~~~~~~~~~~

Authentication endpoints manage user registration, login, token validation,
token refresh, and logout.

.. list-table::
   :header-rows: 1
   :widths: 10 30 25 35

   * - Method
     - Path
     - Permission
     - Description

   * - ``POST``
     - ``/auth/register``
     - Public
     - Create a new user account.

   * - ``POST``
     - ``/auth/login``
     - Public
     - Obtain JWT tokens using OAuth2 form data.

   * - ``POST``
     - ``/auth/login-json``
     - Public
     - Obtain JWT tokens using a JSON request body.

   * - ``GET``
     - ``/auth/me``
     - Authenticated
     - Return the current user's profile and permissions.

   * - ``POST``
     - ``/auth/refresh``
     - Public
     - Exchange a refresh token for a new access token.

   * - ``POST``
     - ``/auth/logout``
     - Public
     - Revoke a refresh token.


Project Management
~~~~~~~~~~~~~~~~~~

Project endpoints provide access to project-level metadata,
configuration, references, and variables.

.. list-table::
   :header-rows: 1
   :widths: 10 35 25 30

   * - Method
     - Path
     - Permission
     - Description

   * - ``GET``
     - ``/list_projects/``
     - ``project:read``
     - List projects accessible to the current user.

   * - ``GET``
     - ``/{project_id}/project_info/``
     - ``project:read``
     - Get project metadata.

   * - ``GET``
     - ``/{project_id}/db_config/``
     - ``project:read``
     - Get the project's database configuration.

   * - ``GET``
     - ``/{project_id}/references/``
     - ``project:read``
     - Get project references.

   * - ``GET``
     - ``/{project_id}/variables/``
     - ``project:read``
     - List project variables.


Model Management and Inference
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

These endpoints provide operations for registered soft sensors and their
associated model artifacts, including listing, reloading, metadata
retrieval, updates, inference, explainability, artifact downloads, and
model bundle retrieval.

.. list-table::
   :header-rows: 1
   :widths: 10 38 25 27

   * - Method
     - Path
     - Permission
     - Description

   * - ``GET``
     - ``/{project_id}/list_soft_sensors/``
     - ``soft_sensors:read``
     - List soft sensors registered in a project.

   * - ``POST``
     - ``/{project_id}/reload/``
     - ``soft_sensors:write``
     - Reload the project's registered models from the database.

   * - ``GET``
     - ``/{project_id}/metadata/{model_id}``
     - ``soft_sensors:read``
     - Get the complete metadata configuration of a model.

   * - ``GET``
     - ``/{project_id}/soft_sensor_full/``
     - ``soft_sensors:read``
     - List online soft sensors with their full metadata.

   * - ``PUT``
     - ``/{project_id}/update/{model_id}``
     - ``soft_sensors:edit``
     - Update model metadata.

   * - ``POST``
     - ``/{project_id}/predict/{model_id}``
     - ``soft_sensors:deploy``
     - Run inference using a registered model.

   * - ``POST``
     - ``/{project_id}/explain/{model_id}``
     - ``soft_sensors:read``
     - Generate explainability results for a model.

   * - ``GET``
     - ``/{project_id}/model_artifact/{model_id}``
     - ``models:read``
     - Download the raw model artifact stored on disk.

   * - ``GET``
     - ``/{project_id}/model_bundle/{model_id}``
     - ``soft_sensors:read``
     - Download a ZIP bundle containing the model metadata and the
       model artifact when available.


Model Artifact
~~~~~~~~~~~~~~

The ``model_artifact`` endpoint returns the raw model binary associated
with a registered model.

Endpoint:

.. code-block:: text

   GET /{project_id}/model_artifact/{model_id}

Path parameters:

``project_id``
   Identifier of the project containing the model.

``model_id``
   Identifier of the registered model.

Permission:

.. code-block:: text

   models:read

The endpoint returns the stored model file as a downloadable binary
response.

If the model does not have a downloadable artifact on disk, the API
returns HTTP ``404``.


Model Bundle
~~~~~~~~~~~~

The ``model_bundle`` endpoint provides a ZIP archive containing the model
metadata and, when available, the model binary.

Endpoint:

.. code-block:: text

   GET /{project_id}/model_bundle/{model_id}

Path parameters:

``project_id``
   Identifier of the project containing the model.

``model_id``
   Identifier of the registered model.

Permission:

.. code-block:: text

   soft_sensors:read

The generated archive contains:

.. code-block:: text

   metadata.yaml
   <model artifact, when available>


Run Time-Series Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~

These endpoints provide access to time-series information associated
with a run.

.. list-table::
   :header-rows: 1
   :widths: 10 40 25 25

   * - Method
     - Path
     - Permission
     - Description

   * - ``GET``
     - ``/api/v1/runs/{run_id}/sensor_readings``
     - ``soft_sensors:read``
     - Get sensor readings associated with a run.

   * - ``GET``
     - ``/api/v1/runs/{run_id}/actuator_states``
     - ``soft_sensors:read``
     - Get actuator states associated with a run.

   * - ``GET``
     - ``/api/v1/runs/{run_id}/predictions``
     - ``soft_sensors:read``
     - Get predictions associated with a run.

   * - ``DELETE``
     - ``/api/v1/runs/{run_id}/reset``
     - ``soft_sensors:edit``
     - Delete time-series data associated with a run.


Detector Pack Operations
~~~~~~~~~~~~~~~~~~~~~~~~

Detector pack endpoints manage registration and activation of
drift-detector bundles.

.. list-table::
   :header-rows: 1
   :widths: 10 45 25 20

   * - Method
     - Path
     - Permission
     - Description

   * - ``POST``
     - ``/api/v1/detector_packs/register``
     - ``detector_packs:write``
     - Upload and register a drift-detector pack.

   * - ``POST``
     - ``/api/v1/detector_packs/{pack_id}/activate``
     - ``detector_packs:edit``
     - Activate a registered detector pack.


Prediction Trigger
~~~~~~~~~~~~~~~~~~

The prediction trigger endpoint creates the next run for an experiment
and requests the prediction workflow through the Airflow orchestrator.

.. list-table::
   :header-rows: 1
   :widths: 10 50 25 15

   * - Method
     - Path
     - Permission
     - Description

   * - ``POST``
     - ``/api/v1/experiments/{experiment_id}/trigger-prediction``
     - ``experiments:write``
     - Create the experiment's next run and attempt to trigger the
       ``deployment_soft_sensors`` Airflow workflow.


Prediction Trigger Details
^^^^^^^^^^^^^^^^^^^^^^^^^^

Endpoint:

.. code-block:: text

   POST /api/v1/experiments/{experiment_id}/trigger-prediction

Path parameter:

``experiment_id``
   UUID identifying the experiment for which the next run is created.

Permission:

.. code-block:: text

   experiments:write

Behavior
~~~~~~~~

The endpoint:

#. Validates that the requested experiment exists.
#. Resolves the project associated with the experiment.
#. Resolves the soft sensors associated with the experiment.
#. Creates a new ``Run`` record.
#. Builds the workflow configuration for the prediction process.
#. Attempts to trigger the ``deployment_soft_sensors`` Airflow DAG.

The Airflow trigger is handled on a best-effort basis.

If Airflow is not configured or is unreachable, the run is still created
and the response indicates that the workflow was not triggered.

The response includes information such as:

.. code-block:: json

   {
     "triggered": false,
     "run_id": "generated-run-id",
     "model_ids": [],
     "reason": "Airflow not configured or unreachable"
   }


Auto-Generated CRUD Endpoints
-----------------------------

In addition to the hand-written endpoints, the Model Registry exposes
auto-generated CRUD routes for the database tables.

The CRUD routes follow the general pattern:

.. code-block:: text

   /api/v1/{table_name}/


Each table exposes five standard operations:

.. list-table::
   :header-rows: 1
   :widths: 15 30 55

   * - Method
     - Operation
     - Description

   * - ``GET``
     - List
     - Retrieve a collection of records.

   * - ``POST``
     - Create
     - Create a new record.

   * - ``GET``
     - Get by ID
     - Retrieve a specific record.

   * - ``PATCH``
     - Update
     - Partially update an existing record.

   * - ``DELETE``
     - Delete
     - Delete an existing record.


CRUD Permissions
~~~~~~~~~~~~~~~~

The generated CRUD endpoints use resource-based permissions.

``GET`` operations require a corresponding ``*:read`` permission.

Creation and modification operations require an appropriate write-level
permission, such as ``*:write``, ``*:edit``, or ``*:deploy``.

Examples include:

.. code-block:: text

   <resource>:read
   <resource>:write
   <resource>:edit
   <resource>:deploy


The current API documentation identifies CRUD routes for 47 database
tables.


Endpoint Permission Summary
---------------------------

The main permission groups used by the documented endpoints are:

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Permission
     - Purpose

   * - ``project:read``
     - Read project information and accessible projects.

   * - ``soft_sensors:read``
     - Read model information, metadata, explanations, bundles,
       and run-related information.

   * - ``soft_sensors:write``
     - Perform model write or reload operations.

   * - ``soft_sensors:edit``
     - Modify model metadata or reset run time-series data.

   * - ``soft_sensors:deploy``
     - Execute model inference.

   * - ``models:read``
     - Read and download raw model artifacts.

   * - ``detector_packs:write``
     - Register or upload detector packs.

   * - ``detector_packs:edit``
     - Activate detector packs.

   * - ``experiments:write``
     - Trigger the prediction workflow for an experiment.


Detailed Examples
-----------------

Detailed request and response examples for the main Model Registry
operations are documented separately.

See:

:doc:`Request/Response Examples <request-response-examples>`

The example set covers the main authentication, project, model listing,
model metadata, and inference flow.


Swagger UI
----------

The complete OpenAPI specification can be explored interactively through
Swagger UI.

Start the Model Registry API and open:

.. code-block:: text

   http://localhost:8080/docs

Swagger UI provides the available endpoints, parameters, request schemas,
authentication controls, and response definitions.

For protected endpoints, authenticate first and provide the generated
access token through the Swagger authorization interface.