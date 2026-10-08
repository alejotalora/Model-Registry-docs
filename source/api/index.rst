API
===

The STAMM Model Registry exposes a REST API implemented with FastAPI.

The API provides access to authentication, project and model management,
model metadata, inference, run time-series data, drift-detector packs,
and database CRUD operations.

The API is exposed on port ``8080``.

.. note::

   The interactive API documentation is available through Swagger UI at:

   ``http://localhost:8080/docs``


API Structure
-------------

The API documentation is organized into the following sections.


API Reference
~~~~~~~~~~~~~

The **API Reference** provides the endpoint catalog for the Model Registry.

It covers the hand-written authentication and model-related endpoints,
as well as the auto-generated CRUD routes exposed for the database tables.

The documentation also identifies the permissions associated with the
protected operations.

:doc:`Open the API Reference <api-reference>`


Authentication & Permissions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The **Authentication & Permissions** section explains how users authenticate
with the API and how authorization is applied to protected operations.

The authentication mechanism uses JWT access and refresh tokens.

Permissions are associated with resources and actions, including
permissions such as ``project:read`` and ``soft_sensors:read``.

:doc:`Open Authentication & Permissions <authentication-permissions>`


Auth Flow
~~~~~~~~~

The **Auth Flow** section documents the sequence used for:

* User registration.
* User authentication.
* JWT token generation.
* Access to protected endpoints.
* Refreshing an expired access token.

The complete authentication sequence is represented in a dedicated
sequence diagram.

:doc:`Open Auth Flow <auth-flow>`


Model Retrieval Flow
~~~~~~~~~~~~~~~~~~~~

The **Model Retrieval Flow** section documents how information about a
registered model is requested and returned through the API.

It focuses on the interaction between the client, the API layer,
the Model Registry, and the database.

A dedicated sequence diagram is included to illustrate this process.

:doc:`Open Model Retrieval Flow <model-retrieval-flow>`


Request/Response Examples
~~~~~~~~~~~~~~~~~~~~~~~~~

The **Request/Response Examples** section contains examples for the key
operations used to interact with the Model Registry.

The documented examples cover the complete usage flow, including:

* Account registration.
* Authentication.
* Token verification.
* Project exploration.
* Model exploration.
* Model metadata retrieval.
* Model inference.

:doc:`Open Request/Response Examples <request-response-examples>`


API Endpoint Categories
-----------------------

The API documentation distinguishes three main types of endpoints.

Hand-written authentication endpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

These endpoints implement the authentication flow, including registration,
login, user information, token refresh, and logout.

Examples include:

.. code-block:: text

   POST /auth/register
   POST /auth/login
   POST /auth/login-json
   GET  /auth/me
   POST /auth/refresh
   POST /auth/logout


Hand-written model and project endpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

These endpoints provide project and model operations such as listing
projects, retrieving model information, updating metadata, running
inference, accessing run data, and managing detector packs.

Examples include:

.. code-block:: text

   GET  /list_projects/
   GET  /{project_id}/list_soft_sensors/
   GET  /{project_id}/metadata/{model_id}
   POST /{project_id}/predict/{model_id}


Auto-generated CRUD endpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In addition to the hand-written endpoints, the API exposes database
tables through automatically generated CRUD routes.

The general route pattern is:

.. code-block:: text

   /api/v1/{table_name}/

The CRUD scaffold provides five standard operations:

.. list-table::
   :header-rows: 1
   :widths: 20 30 50

   * - Method
     - Operation
     - Purpose
   * - GET
     - List
     - Retrieve records from a table.
   * - POST
     - Create
     - Create a new record.
   * - GET
     - Get by ID
     - Retrieve a specific record.
   * - PATCH
     - Update
     - Modify an existing record.
   * - DELETE
     - Delete
     - Remove a record.

The CRUD routes follow the permission rules documented in the API
Reference.


Permissions
-----------

Protected API operations require the corresponding permission.

Examples documented in the API include:

.. code-block:: text

   project:read
   soft_sensors:read
   soft_sensors:write
   soft_sensors:edit
   soft_sensors:deploy
   detector_packs:write
   detector_packs:edit

Authentication and authorization details are documented separately in:

:doc:`Authentication & Permissions <authentication-permissions>`


API Diagrams
------------

The API documentation includes two sequence diagrams.

The first describes the authentication and permissions flow.

:doc:`Auth Flow <auth-flow>`

The second describes the model retrieval flow.

:doc:`Model Retrieval Flow <model-retrieval-flow>`


.. toctree::
   :hidden:

   api-reference
   authentication-permissions
   auth-flow
   model-retrieval-flow
   request-response-examples