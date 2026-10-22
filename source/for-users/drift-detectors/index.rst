
Drift Detectors
===============

This guide explains how to register and activate drift-detector packs
through the STAMM Model Registry.

Drift detection helps identify changes in data distributions or
relationships that may affect the reliability of machine-learning
soft sensors.

The drift detection toolkit is a separate STAMM component. The Model
Registry provides API operations to register detector packs and activate
a registered pack version for use by the platform.

This guide focuses on the Registry operations. It does not describe
the implementation of individual detectors or the Dashboard's
drift-monitoring visualizations.

Before you begin
----------------

Before registering or activating a detector pack, make sure that:

* The Model Registry API is running.
* You can access the REST API documentation.
* You have a valid detector-pack archive that follows the expected
  packaging structure.
* You have authenticated if the endpoint requires it.
* Your account has the permission required for the operation.

Open Swagger UI at:

.. code-block:: text

   http://localhost:8080/docs

Understanding detector packs
----------------------------

A detector pack is a packaged collection of drift detectors and their
metadata.

The STAMM drift-detection toolkit uses metadata files to describe
detectors, including information such as their names, families,
parameters, and output details.

The Registry provides operations for registering a pack and activating
a registered pack. Registration and activation are separate operations.

Preparing a detector-pack archive
---------------------------------

Before registering a pack, obtain a valid archive that follows the
packaging requirements of the drift-detection toolkit.

If you are responsible for building the archive, consult the official
toolkit repository and its packaging instructions:

`STAMM Drift Detectors repository
<https://github.com/stamm-4m/drift_detectors_pack>`_.

The repository documents a helper for building the uploadable archive:

.. code-block:: bash

   python tools/build_detector_pack.py

Use the archive produced by the tool or another archive that complies
with the Registry's supported format.

The required archive structure and accepted upload fields should be
verified against the version of the toolkit and the request schema
exposed by the running Registry API.

Registering a detector pack
---------------------------

The Registry exposes an endpoint for uploading and registering a
detector pack.

**Method:** ``POST``

**Endpoint:**

.. code-block:: text

   /api/v1/detector_packs/register

**Required permission:** ``detector_packs:write``

To register a pack:

#. Start the Model Registry services.

#. Open Swagger UI:

   .. code-block:: text

      http://localhost:8080/docs

#. Locate the ``POST /api/v1/detector_packs/register`` endpoint.

#. Expand the endpoint and review its description, request content
   type, parameters, and request schema.

#. Select **Try it out**, when available.

#. Provide the detector-pack archive and any other required fields
   according to the schema shown by Swagger.

#. Execute the request.

#. Inspect the HTTP status code and the response body.

#. Record the identifier returned for the registered pack, if the
   response provides one. This identifier may be needed for activation.

Do not assume the upload field name or the response structure.
Use the values and schema exposed by the running API.

Activating a detector pack
--------------------------

After registering a detector pack, the Registry provides an endpoint
to activate a registered pack.

**Method:** ``POST``

**Endpoint:**

.. code-block:: text

   /api/v1/detector_packs/{pack_id}/activate

**Required permission:** ``detector_packs:edit``

The ``pack_id`` path parameter identifies the registered pack to
activate. Use the identifier associated with the pack you intend to
activate.

To activate a pack:

#. Open Swagger UI and locate the activation endpoint.

#. Expand the endpoint and select **Try it out**, when available.

#. Enter the identifier of the registered pack in the ``pack_id``
   path parameter.

#. Review any additional fields or requirements displayed by the API.

#. Execute the request.

#. Inspect the status code and response body to determine whether
   activation succeeded.

Activation should be treated as a separate step from registration.
A successful registration response does not, by itself, establish
that the pack has been activated.

Authentication and permissions
------------------------------

The documented detector-pack operations require different permissions.

.. list-table::
   :header-rows: 1
   :widths: 35 35 30

   * - Operation
     - Permission
     - Purpose

   * - Register a detector pack
     - ``detector_packs:write``
     - Upload and register a pack.

   * - Activate a detector pack
     - ``detector_packs:edit``
     - Activate a registered pack.

If an operation is rejected, verify the authentication state and
confirm that your account has the permission required by that endpoint.

For additional authentication information, see:

:doc:`Authentication and Permissions </api/authentication-permissions>`

For the full endpoint catalog, see:

:doc:`API Reference </api/api-reference>`

Understanding the role of the Dashboard
---------------------------------------

Registering or activating a detector pack is not the same as inspecting
drift indicators in the Dashboard.

The drift-detection toolkit supplies the detector implementations and
their metadata. The STAMM platform uses detector results within its
monitoring workflow, while the Dashboard presents monitoring
information to users.

For background on detector families and their behavior, consult the
`official STAMM Drift Detection documentation
<https://stamm.inrae.fr/docs/modules/drift-detection/>`_.

Troubleshooting
---------------

**The registration request is rejected.**

Verify that the archive follows the required packaging format and
that the submitted fields match the request schema displayed in
Swagger UI.

**The API returns an authentication or authorization error.**

Verify the access token and confirm that your account has the
``detector_packs:write`` or ``detector_packs:edit`` permission,
as appropriate.

**Activation fails after registration.**

Check that the pack identifier is correct and refers to a registered
pack. Review the response body for details about the failure.

**The activation response is unclear.**

Inspect the endpoint's documented response schema and the returned
status code. Do not assume activation succeeded without checking
the result.

Summary
-------

The Model Registry supports two distinct detector-pack operations:

* Registering a detector pack using
  ``POST /api/v1/detector_packs/register``.
* Activating a registered pack using
  ``POST /api/v1/detector_packs/{pack_id}/activate``.

Use the request schemas exposed by Swagger UI, verify the required
permissions, and inspect each response before proceeding to the
next operation.
