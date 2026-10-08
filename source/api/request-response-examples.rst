Request/Response Examples
=========================

This section provides request and response examples for the key
operations of the STAMM Model Registry API.

The selected examples cover the main usage flow of the API, including
account registration, authentication, token verification, project
exploration, model exploration, model metadata retrieval, and model
inference.

Key Endpoints
-------------

The current documentation identifies the following key endpoints:

.. list-table::
   :header-rows: 1
   :widths: 15 45 40

   * - Method
     - Endpoint
     - Purpose
   * - POST
     - ``/auth/register``
     - Create a new user account.
   * - POST
     - ``/auth/login-json``
     - Obtain JWT access and refresh tokens.
   * - GET
     - ``/auth/me``
     - Retrieve the current user's profile and permissions.
   * - POST
     - ``/auth/refresh``
     - Obtain a new access token.
   * - GET
     - ``/list_projects/``
     - List projects accessible to the authenticated user.
   * - GET
     - ``/{project_id}/list_soft_sensors/``
     - List models registered in a project.
   * - GET
     - ``/{project_id}/metadata/{model_id}``
     - Retrieve the model's full configuration.
   * - POST
     - ``/{project_id}/predict/{model_id}``
     - Run inference on a registered model.

The complete request and response payloads are documented below.

Authentication Examples
-----------------------

POST /auth/register
~~~~~~~~~~~~~~~~~~~

Request:

.. code-block:: json

   {
     "email": "test.documentation@example.com",
     "password": "DocTest2026",
     "full_name": "Test User"
   }

Response (200):

.. code-block:: json

   {
     "message": "User created",
     "email": "test.documentation@example.com"
   }


POST /auth/login-json
~~~~~~~~~~~~~~~~~~~~~

Request:

.. code-block:: json

   {
     "email": "test.documentation@example.com",
     "password": "DocTest2026"
   }

Response (200):

.. code-block:: json

   {
     "access_token": "eyJhbGciOiJIUzI1NiIs...",
     "refresh_token": "lgAHjMdtM_l5D0PyWpNhPd42R1Ra...",
     "token_type": "bearer"
   }


GET /auth/me
~~~~~~~~~~~~

This endpoint does not require a request body.

A valid access token must be provided.

Response (200):

.. code-block:: json

   {
     "email": "test.documentation@example.com",
     "id": "c0f842c9-...",
     "roles": [],
     "permissions": [],
     "resources": []
   }


POST /auth/refresh
~~~~~~~~~~~~~~~~~~

Request:

.. code-block:: json

   {
     "refresh_token": "lgAHjMdtM_l5D0PyWpNhPd42R1Ra..."
   }

Response (200):

.. code-block:: json

   {
     "access_token": "eyJhbGciOiJIUzI1NiIs...",
     "refresh_token": "lgAHjMdtM_l5D0PyWpNh42R1Ra...",
     "token_type": "bearer"
   }


Model and Project Examples
---------------------------

GET /list_projects/
~~~~~~~~~~~~~~~~~~~

This endpoint returns the projects accessible to the authenticated user.

Response (200):

.. code-block:: json

   [
     {
       "project_ID": "IndPenSim",
       "name": "IndPenSim",
       "description": "Industrial penicillin fermentation simulation",
       "create_at": "2025-11-01"
     }
   ]


GET /{project_id}/list_soft_sensors/
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Path parameter:

``project_id``

Example:

.. code-block:: text

   IndPenSim

Response (200):

.. code-block:: json

   [
     {
       "model_ID": "0009_[Python]_penicillin_LSTM",
       "model_name": "LSTM",
       "metadata": {
         "name": "LSTM",
         "version": "V.1.0",
         "author": "Suarez, C., Astudillo A., ...",
         "status": "online"
       }
     }
   ]


GET /{project_id}/metadata/{model_id}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Path parameters:

* ``project_id``
* ``model_id``

Response (200):

The endpoint returns the soft sensor's full configuration as JSON.

The complete metadata structure is described in the
Model Metadata Storage documentation.


POST /{project_id}/predict/{model_id}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The inference endpoint receives feature values according to the input
schema defined for the model.

Request:

.. code-block:: json

   {
     "req": {
       "input_data": [
         [298.5, 6.2, 0.45, 1.2, 35.0, 0.8, 500, 7.5]
       ]
     }
   }

Response (200):

.. code-block:: json

   {
     "predictions": [[24.37]],
     "output_names": ["penicillin_concentration"],
     "units": ["g/L"]
   }