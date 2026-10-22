
CRUD Operations
===============

This guide explains how to create, retrieve, update, and delete records
through the CRUD endpoints provided by the STAMM Model Registry API.

CRUD stands for:

* **Create:** create a new record.
* **Read:** retrieve an existing record or a collection of records.
* **Update:** modify an existing record.
* **Delete:** remove an existing record.

The Model Registry provides auto-generated CRUD routes for database
tables through its REST API. The exact fields, schemas, permissions,
and operations depend on the selected resource.

These instructions describe the API workflow. They do not assume that
every CRUD operation is available through the web dashboard.

Before you begin
----------------

Before performing a CRUD operation, make sure that:

* The Model Registry services are running.
* You can access the REST API documentation.
* You have authenticated when the selected endpoint requires it.
* Your user account has the permissions required for the operation.

The interactive API documentation is available at:

.. code-block:: text

   http://localhost:8080/docs

Understanding CRUD endpoints
----------------------------

The auto-generated CRUD routes follow this general pattern:

.. code-block:: text

   /api/v1/{table_name}/

The ``table_name`` represents the resource exposed by the API.

The CRUD interface provides the following standard operations for
supported resources.

.. list-table::
   :header-rows: 1
   :widths: 15 25 60

   * - Method
     - Operation
     - Purpose

   * - ``GET``
     - List records
     - Retrieve a collection of records.

   * - ``POST``
     - Create a record
     - Submit data to create a new record.

   * - ``GET``
     - Retrieve a record
     - Retrieve an individual record using its identifier.

   * - ``PATCH``
     - Update a record
     - Submit changes to an existing record.

   * - ``DELETE``
     - Delete a record
     - Request the removal of an existing record.

The exact path, path parameter name, request schema, and response
format are documented for each endpoint in Swagger UI.

Accessing the CRUD endpoints
----------------------------

Follow these steps to locate the available operations.

#. Start the Model Registry application.

#. Open Swagger UI in your browser:

   .. code-block:: text

      http://localhost:8080/docs

#. Locate the resource or database table you need to manage.

#. Expand the corresponding endpoint group to inspect its available
   operations.

#. Select the appropriate HTTP method and review the endpoint
   description, parameters, request body, and response schema.

#. If the endpoint requires authentication, use the API authorization
   mechanism and provide a valid access token.

#. Check the documented permissions before executing the operation.

Creating a record
-----------------

Use the ``POST`` operation to create a new record for a supported
resource.

#. Locate the ``POST`` endpoint for the resource in Swagger UI.

#. Expand the endpoint and select **Try it out**, when available.

#. Review the request body schema.

#. Enter a JSON document containing the required fields and valid values
   for that resource.

#. Execute the request.

#. Review the HTTP status code and response body to determine whether
   the operation succeeded.

The request body is resource-specific. Use the schema shown in Swagger
rather than assuming that every table accepts the same fields.

Reading records
---------------

The API supports two general read operations.

Listing records
~~~~~~~~~~~~~~~

Use the collection-level ``GET`` endpoint to retrieve records for a
resource.

#. Locate the collection-level ``GET`` endpoint in Swagger UI.
#. Review any query parameters or filters supported by the endpoint.
#. Select **Try it out**, when available.
#. Execute the request.
#. Inspect the returned records and response status.

Retrieving a record by identifier
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the individual-record ``GET`` endpoint when you need one specific
record.

#. Locate the ``GET`` endpoint that retrieves an individual record.
#. Identify the path parameter used for the record identifier.
#. Enter the identifier of the record you want to inspect.
#. Execute the request.
#. Review the returned record and the response status.

Updating a record
-----------------

Use the ``PATCH`` operation to modify an existing record.

#. Locate the ``PATCH`` endpoint for the resource.
#. Review the path parameters and request body schema.
#. Enter the identifier of the record to update.
#. Submit the fields and values supported by the endpoint.
#. Execute the request.
#. Inspect the response to determine whether the changes were accepted.

The fields that can be changed depend on the resource schema and the
API implementation. Do not assume that every field can be updated.

Deleting a record
-------------------

Use the ``DELETE`` operation to request the removal of an existing
record.

#. Locate the ``DELETE`` endpoint for the resource.
#. Identify the path parameter used to select the record.
#. Verify that the identifier belongs to the intended record.
#. Check the required permission and any documented restrictions.
#. Execute the request only when you are certain that the record should
   be deleted.
#. Review the response to confirm the result.

Deletion may affect data or resources that other parts of the
application depend on. The actual behavior depends on the resource and
its database constraints. Do not assume that deletion can be reversed.

Authentication and permissions
------------------------------

CRUD operations use resource-based permissions.

Read operations generally require an appropriate read permission.
Creating records requires a suitable write permission, while updates
and deletions depend on the permissions configured for the corresponding
resource and endpoint.

Permission names may include suffixes such as:

.. code-block:: text

   <resource>:read
   <resource>:write
   <resource>:edit

These patterns are examples, not a complete permission list for every
resource. Verify the actual permission requirements in the API
documentation.

For details about authentication, access tokens, and permissions, see:

:doc:`Authentication and Permissions </api/authentication-permissions>`

For the complete endpoint reference, see:

:doc:`API Reference </api/api-reference>`

Understanding API responses
---------------------------

After executing a request, inspect both the HTTP status code and the
response body.

The status code indicates the general outcome of the request. The
response body may contain the requested record, the result of an
operation, validation details, or an error message.

A successful response does not necessarily mean that the resulting
record contains every value expected by the user. Check the returned
data when correctness matters.

Troubleshooting
---------------

**The API returns an authentication or authorization error.**

Check whether the endpoint requires an access token and whether your
account has the required permission.

**The API rejects the request body.**

Compare the submitted JSON with the request schema in Swagger UI.
Verify required fields, data types, and allowed values.

**The API cannot find the requested record.**

Check the resource path and the identifier supplied to the endpoint.

**The API reports a conflict or another database-related error.**

Review the response details and check whether the request violates a
resource constraint or conflicts with existing data.

**An operation is not available for a resource.**

Not every database table or endpoint necessarily supports every
operation. Use the operations and schemas exposed by the running API
as the reference for that resource.

Summary
-------

The CRUD API provides a standardized way to manage supported database
resources through HTTP requests.

Before performing an operation, identify the correct resource, inspect
its endpoint schema, verify the required permissions, and review the
response to confirm the result.
