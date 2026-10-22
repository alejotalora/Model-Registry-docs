
ML Soft Sensors
===============

This section of the user guide explains how to work with machine-learning
soft sensors registered in the STAMM Model Registry.

A soft sensor is a machine-learning model used to estimate a process
variable that may be difficult to measure directly. The Model Registry
provides a centralized way to manage, discover, and serve these models,
together with their metadata and artifacts.

The procedures in this section focus on the operations supported by the
Model Registry. Each guide describes a particular group of functionalities
and identifies the relevant interface, permissions, and requirements.

Available guides
----------------

CRUD Operations
~~~~~~~~~~~~~~~

Learn how to create, retrieve, update, and delete supported records
through the Model Registry API.

See :doc:`CRUD Operations <crud>`.

Model Explainability (XAI)
~~~~~~~~~~~~~~~~~~~~~~~~~~

Learn how to request and inspect explainability results for a registered
soft sensor through the Model Registry API.

See :doc:`Model Explainability (XAI) <xai>`.

Other Functionalities
~~~~~~~~~~~~~~~~~~~~~

Explore additional operations, including discovering projects and
soft sensors, retrieving metadata, requesting predictions, downloading
model artifacts, and accessing run-related time-series data.

See :doc:`Other Soft Sensor Functionalities <other-functionalities>`.

Choosing the appropriate interface
----------------------------------

The Model Registry provides a web dashboard and a REST API.

The interface used for an operation depends on the functionality
available in the application. The individual guides distinguish API
operations from workflows that have been verified in the dashboard.

The interactive API documentation is available at:

.. code-block:: text

   http://localhost:8080/docs

Authentication and permissions may be required for protected operations.
Consult the relevant guide for the requirements associated with each
operation.

Guide navigation
----------------

.. toctree::
   :maxdepth: 2
   :caption: Soft Sensor Guides

   crud
   xai
   other-functionalities
