
For users
=========

Welcome to the user guide for the STAMM Model Registry.

This section explains how to use the Model Registry's user-facing
functionalities. It is intended for users who need to discover projects
and soft sensors, inspect model information, request predictions, access
model explanations, and work with the resources provided by the Registry.

The Model Registry centralizes the management, discovery, and serving
of machine-learning models implemented in Python and R. Its capabilities
are exposed through a web dashboard and a REST API. The interface used
for each operation will be identified in the corresponding guide.

User guides
-----------

ML Soft Sensors
~~~~~~~~~~~~~~~

Learn how to work with registered soft sensors, inspect their metadata,
request predictions, and access the available model-related operations.

See :doc:`ML Soft Sensors <ml-soft-sensors/index>` for guides covering
CRUD operations, model explainability (XAI), and other functionalities.

Drift Detectors
~~~~~~~~~~~~~~~

Learn about the detector-pack operations provided by the Model Registry,
including registering a detector pack and activating a registered pack.

See :doc:`Drift Detectors <drift-detectors/index>` for the corresponding
guide.

Before you begin
----------------

Before following a procedure, make sure the Model Registry is running
and that you have access to the required interface.

* **Backend dashboard:** ``http://localhost``

* **REST API documentation (Swagger UI):**
  ``http://localhost:8080/docs``

For installation instructions and information about starting the
application, see:

:doc:`Installation and Deployment </getting-started/installation>`

Some operations require authentication and specific permissions.
Each procedure identifies the relevant requirements where applicable.

How to use this guide
---------------------

Start with the guide that matches the operation you need to perform.

Each procedure describes the purpose of the operation, the interface
used, the prerequisites, the steps to follow, and the expected result.

Screenshots, animated GIFs, and video demonstrations will be incorporated
where they help explain a verified workflow.

The instructions are based on the documented Model Registry
functionality. Where an interface or operation has not yet been verified,
the guide will not assume that a particular button or workflow exists.

Navigation
----------

.. toctree::
   :maxdepth: 2
   :caption: User Guides

   ml-soft-sensors/index
   drift-detectors/index
