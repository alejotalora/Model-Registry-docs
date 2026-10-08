Authentication & Permissions
============================

The STAMM Model Registry API uses authentication and authorization to
control access to protected operations.

Authentication is based on JWT access and refresh tokens.

Access tokens are used when calling protected API endpoints, while
refresh tokens are used to obtain a new access token without requiring
the user to authenticate again.

Permissions
-----------

Protected operations require the corresponding permission.

Examples of permissions used by the current API include:

.. code-block:: text

   project:read
   soft_sensors:read
   soft_sensors:write
   soft_sensors:edit
   soft_sensors:deploy
   detector_packs:write
   detector_packs:edit

Roles and permissions determine which resources and operations are
available to a user.

The complete authentication sequence is documented in the
:doc:`Auth Flow <auth-flow>` section.