
Model Explainability (XAI)
==========================

This guide explains how to request and inspect model explainability
results using the STAMM Model Registry API.

Explainable AI (XAI) refers to methods and results that help users
understand aspects of a machine-learning model's predictions. The
interpretation of an explanation depends on the model, the explanation
method, and the information returned by the API.

The Model Registry exposes an endpoint for generating explainability
results for a registered soft sensor.

Before you begin
----------------

Before requesting an explanation, make sure that:

* The Model Registry API is running.
* You know the identifier of the project containing the model.
* You know the identifier of the registered soft sensor.
* You have authenticated if required by the API.
* Your account has the ``soft_sensors:read`` permission.

Open the interactive API documentation at:

.. code-block:: text

   http://localhost:8080/docs

Available endpoint
------------------

The model explainability endpoint is:

.. code-block:: text

   POST /{project_id}/explain/{model_id}

The path parameters identify the project and the registered model
for which an explanation is requested.

``project_id``
   Identifier of the project containing the soft sensor.

``model_id``
   Identifier of the registered soft sensor to explain.

Required permission
~~~~~~~~~~~~~~~~~~~

.. code-block:: text

   soft_sensors:read

The endpoint's request schema, accepted parameters, and response format
must be checked in the API documentation for the running application.

Requesting an explanation through Swagger
-----------------------------------------

Follow these steps to explore and execute the explainability endpoint.

#. Start the Model Registry services.

#. Open Swagger UI in your browser:

   .. code-block:: text

      http://localhost:8080/docs

#. Authenticate using a valid access token if the endpoint requires it.
   See the Authentication and Permissions documentation for details.

#. Locate the ``POST`` endpoint ending in
   ``/{project_id}/explain/{model_id}``.

#. Expand the endpoint and select **Try it out**, when available.

#. Enter the project identifier and model identifier in the appropriate
   path-parameter fields.

#. Review the request body schema and any additional parameters shown
   by Swagger. Provide values only in the format accepted by the
   documented schema.

#. Execute the request.

#. Inspect the HTTP status code and the response body.

The request body may depend on the implementation. Use the schema
provided by the running API instead of assuming that a particular JSON
structure is required.

Understanding the response
--------------------------

The endpoint generates explainability results for the selected model.

When inspecting the response:

* Review the returned explanation data and its structure.
* Check which model and input information the results refer to, when
  this information is included in the response.
* Consult the endpoint schema and implementation documentation when
  the meaning of a returned field is unclear.
* Do not interpret an explanation as proof of a causal relationship.

The precise response fields and their interpretation should be
documented from the actual response produced by the running API.
Examples and screenshots can be added once that response has been
verified.

Authentication and permissions
------------------------------

Explainability requests require the ``soft_sensors:read`` permission
according to the current API reference.

If the request is rejected, verify that:

* The access token is valid, if authentication is required.
* The authenticated account has the required permission.
* The project and model identifiers are correct.
* The endpoint and request parameters match the API schema.

For more information, see:

:doc:`Authentication and Permissions </api/authentication-permissions>`

For the complete endpoint catalog, see:

:doc:`API Reference </api/api-reference>`

Troubleshooting
---------------

**The request is rejected because of authentication or permissions.**

Verify the access token and confirm that the account has the
``soft_sensors:read`` permission.

**The API cannot find the project or model.**

Verify the identifiers and ensure that the selected model belongs to
the specified project.

**The request body is rejected.**

Review the request schema displayed by Swagger and correct any
missing required fields or values with the wrong data type.

**The request returns an unexpected response.**

Record the HTTP status code and response body. Compare them with the
endpoint documentation before drawing conclusions about the result.

Summary
-------

The XAI endpoint provides a way to request explainability results for
a registered soft sensor.

Use the project and model identifiers, verify the required permissions,
follow the request schema exposed by Swagger, and inspect the returned
data before interpreting the explanation.
