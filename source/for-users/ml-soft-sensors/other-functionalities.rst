
Other Soft Sensor Functionalities
=================================

This guide describes additional operations available through the
STAMM Model Registry API for discovering projects and soft sensors,
inspecting model metadata, requesting predictions, and downloading
model artifacts.

These operations complement the CRUD and model explainability guides.

The procedures below describe API-based workflows. They do not assume
that every operation is also available through the web dashboard.

Before you begin
----------------

Before using these operations, ensure that:

* The Model Registry services are running.
* You can access the REST API.
* You have authenticated if the selected endpoint requires it.
* Your account has the permissions required for the operation.

The interactive API documentation is available at:

.. code-block:: text

   http://localhost:8080/docs

The exact request parameters, schemas, and response formats should be
checked in Swagger UI for the running application.

Discovering projects
---------------------

The Model Registry provides endpoints for listing accessible projects
and retrieving project information.

List accessible projects
~~~~~~~~~~~~~~~~~~~~~~~~

**Method:** ``GET``

**Endpoint:**

.. code-block:: text

   /list_projects/

**Permission:** ``project:read``

This endpoint lists the projects accessible to the current user.

To use it:

#. Open Swagger UI.
#. Locate the ``GET /list_projects/`` endpoint.
#. Expand the endpoint and select **Try it out**, when available.
#. Execute the request.
#. Review the returned projects and identify the project needed for
   the operation you want to perform.

Project information
~~~~~~~~~~~~~~~~~~~

Once you have identified a project, the API provides endpoints to
retrieve additional information.

.. list-table::
   :header-rows: 1
   :widths: 35 35 30

   * - Operation
     - Endpoint
     - Permission

   * - Retrieve project information
     - ``GET /{project_id}/project_info/``
     - ``project:read``

   * - Retrieve project references
     - ``GET /{project_id}/references/``
     - ``project:read``

   * - Retrieve project variables
     - ``GET /{project_id}/variables/``
     - ``project:read``

The ``project_id`` path parameter identifies the project to inspect.

Use the schemas and descriptions displayed by Swagger UI to understand
the information returned by each endpoint.

Discovering soft sensors
------------------------

After selecting a project, you can retrieve information about its
registered soft sensors.

List soft sensors
~~~~~~~~~~~~~~~~~

**Method:** ``GET``

**Endpoint:**

.. code-block:: text

   /{project_id}/list_soft_sensors/

**Permission:** ``soft_sensors:read``

This endpoint lists the soft sensors registered in a project.

#. Locate the endpoint in Swagger UI.
#. Enter the project identifier.
#. Execute the request.
#. Review the returned list to identify the model you want to inspect.

Retrieving model metadata
~~~~~~~~~~~~~~~~~~~~~~~~~

**Method:** ``GET``

**Endpoint:**

.. code-block:: text

   /{project_id}/metadata/{model_id}

**Permission:** ``soft_sensors:read``

This endpoint retrieves the metadata configuration associated with
a registered model.

The path parameters identify the project and model.

Use the response to inspect the available metadata fields. The exact
fields depend on the model configuration returned by the API.

Listing soft sensors with full metadata
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Method:** ``GET``

**Endpoint:**

.. code-block:: text

   /{project_id}/soft_sensor_full/

**Permission:** ``soft_sensors:read``

This endpoint lists online soft sensors together with their full
metadata, according to the current API reference.

Inspect the endpoint description and response schema in Swagger UI
to determine which fields are returned by the running version.

Reloading registered soft sensors
---------------------------------

The Registry provides an operation to reload registered models for
a project.

**Method:** ``POST``

**Endpoint:**

.. code-block:: text

   /{project_id}/reload/

**Permission:** ``soft_sensors:write``

To execute the operation:

#. Locate the reload endpoint in Swagger UI.
#. Enter the project identifier.
#. Review the endpoint description and any required parameters.
#. Execute the request only when a reload is needed.
#. Inspect the response to determine whether the operation succeeded.

The exact effects of a reload depend on the implementation. Review the
response and the API documentation rather than assuming that the
operation trains a model or changes its underlying artifact.

Requesting a prediction
-----------------------

The Model Registry provides an endpoint for running inference with
a registered soft sensor.

**Method:** ``POST``

**Endpoint:**

.. code-block:: text

   /{project_id}/predict/{model_id}

**Permission:** ``soft_sensors:deploy``

To request a prediction:

#. Identify the project containing the required soft sensor.
#. Identify the model using its registered model identifier.
#. Open the prediction endpoint in Swagger UI.
#. Enter the project and model identifiers.
#. Review the request body schema, required inputs, and any additional
   parameters shown by Swagger.
#. Provide the input data in the documented format.
#. Execute the request.
#. Inspect the status code and returned prediction data.

The required inputs depend on the model and endpoint schema. Do not
assume that every soft sensor uses the same request body.

A successful HTTP response indicates that the request was processed
successfully according to the endpoint behavior. Review the returned
data to understand the prediction result.

Downloading model artifacts
---------------------------

The Registry provides endpoints for retrieving the files associated
with registered soft sensors.

Downloading the model artifact
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Method:** ``GET``

**Endpoint:**

.. code-block:: text

   /{project_id}/model_artifact/{model_id}

**Permission:** ``models:read``

This endpoint returns the raw model artifact associated with a
registered model as a downloadable binary response.

Use it when you need the model file itself.

If a downloadable artifact is not available for the selected model,
the endpoint may return HTTP ``404``.

Downloading a model bundle
~~~~~~~~~~~~~~~~~~~~~~~~~~

**Method:** ``GET``

**Endpoint:**

.. code-block:: text

   /{project_id}/model_bundle/{model_id}

**Permission:** ``soft_sensors:read``

This endpoint provides a ZIP archive containing the model metadata and,
when available, the model artifact.

The documented archive contents include:

.. code-block:: text

   metadata.yaml
   <model artifact, when available>

Use this endpoint when you need the metadata and model file together.

Inspect the response in Swagger UI to understand how the archive is
returned and how to download it using the available interface.

Accessing run time-series data
------------------------------

The API also exposes operations for retrieving time-series data
associated with a run.

The documented endpoints include:

.. list-table::
   :header-rows: 1
   :widths: 45 35 20

   * - Operation
     - Endpoint
     - Permission

   * - Retrieve sensor readings
     - ``GET /api/v1/runs/{run_id}/sensor_readings``
     - ``soft_sensors:read``

   * - Retrieve actuator states
     - ``GET /api/v1/runs/{run_id}/actuator_states``
     - ``soft_sensors:read``

   * - Retrieve predictions
     - ``GET /api/v1/runs/{run_id}/predictions``
     - ``soft_sensors:read``

The ``run_id`` parameter identifies the run whose data you want to
retrieve.

To use one of these operations:

#. Locate the required endpoint in Swagger UI.
#. Enter the run identifier.
#. Review any additional parameters.
#. Execute the request.
#. Inspect the returned data and response status.

Resetting run time-series data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The API also documents an operation to reset time-series data
associated with a run.

**Method:** ``DELETE``

**Endpoint:**

.. code-block:: text

   /api/v1/runs/{run_id}/reset

**Permission:** ``soft_sensors:edit``

This operation can delete time-series data associated with the selected
run. Review the endpoint description and confirm the target run before
executing it.

Do not perform this operation unless you understand its effects and
have authorization to modify the associated data.

Authentication and permissions
------------------------------

The endpoints covered in this guide use resource-based permissions.

The main permissions referenced above include:

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Permission
     - Purpose

   * - ``project:read``
     - Access project information.

   * - ``soft_sensors:read``
     - Read soft sensor information and metadata.

   * - ``soft_sensors:write``
     - Perform supported reload or write operations.

   * - ``soft_sensors:deploy``
     - Execute model inference.

   * - ``models:read``
     - Access or download model artifacts.

   * - ``soft_sensors:edit``
     - Perform supported modifications, including the documented run
       time-series reset operation.

These permissions are shown according to the current API reference.
Check the running API documentation for the requirements that apply
to each endpoint.

For additional details, see:

:doc:`Authentication and Permissions </api/authentication-permissions>`

:doc:`API Reference </api/api-reference>`

Troubleshooting
---------------

**The API does not return the expected project or model.**

Verify the project identifier, model identifier, and the permissions
of the authenticated user.

**The prediction request is rejected.**

Review the request schema in Swagger UI, verify the required input
fields, and check the ``soft_sensors:deploy`` permission.

**The model artifact cannot be downloaded.**

Verify the project and model identifiers. The selected model must have
a downloadable artifact available.

**A request returns an authentication or authorization error.**

Verify the access token and check the permission required by the
endpoint.

**A time-series endpoint does not return the expected data.**

Verify the run identifier and inspect the endpoint parameters and
response schema.

Summary
-------

The Model Registry provides additional operations for discovering
projects and soft sensors, inspecting metadata, requesting predictions,
downloading model artifacts and bundles, and retrieving run-related
time-series data.

Always inspect the endpoint schema, verify the required permissions,
and review the response before relying on the result.
