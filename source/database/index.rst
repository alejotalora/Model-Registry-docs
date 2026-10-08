Database
========

The Model Registry database contains the persistent data structures used
to manage models, experiments, organizations, monitoring information,
federated learning, and time-series data.


.. _database-overview:

Database Overview
-----------------

The database documentation is organized into functional domains that group
related tables according to their role within the system.

These focused views make the database structure easier to understand
without requiring the reader to inspect the complete entity-relationship
diagram at once.

Select a domain below to explore its focused entity-relationship diagram.


.. raw:: html

   <div class="database-grid">

   <a class="database-card" href="model-governance.html">
   <h3>Model Governance</h3>
   <p>Model-related entities, associations, metadata, and model management structures.</p>
   <p class="explore">Explore domain →</p>
   </a>

   <a class="database-card" href="federated-learning.html">
   <h3>Federated Learning</h3>
   <p>Federations, participants, rounds, and model contribution structures.</p>
   <p class="explore">Explore domain →</p>
   </a>

   <a class="database-card" href="drift-monitoring.html">
   <h3>Drift Monitoring</h3>
   <p>Drift detectors, monitoring results, detector packs, and related entities.</p>
   <p class="explore">Explore domain →</p>
   </a>

   <a class="database-card" href="identity-rbac.html">
   <h3>Identity &amp; RBAC</h3>
   <p>Users, roles, permissions, and access-control structures.</p>
   <p class="explore">Explore domain →</p>
   </a>

   <a class="database-card" href="org-hierarchy.html">
   <h3>Organization Hierarchy</h3>
   <p>Organizations, laboratories, and organizational relationships.</p>
   <p class="explore">Explore domain →</p>
   </a>

   <a class="database-card" href="bioprocess-runs.html">
   <h3>Bioprocess &amp; Runs</h3>
   <p>Projects, experiments, runs, equipment, instruments, sensors, actuators, and simulations.</p>
   <p class="explore">Explore domain →</p>
   </a>

   <a class="database-card" href="hypertables.html">
   <h3>TimescaleDB Hypertables</h3>
   <p>Time-series data structures used by the Model Registry and TimescaleDB.</p>
   <p class="explore">Explore domain →</p>
   </a>

   <a class="database-card" href="operations-audit.html">
   <h3>Operations &amp; Audit</h3>
   <p>Operational records, audit information, alerts, and system activity.</p>
   <p class="explore">Explore domain →</p>
   </a>

   <a class="database-card full-erd" href="full-erd.html">
   <h3>Full ERD</h3>
   <p>Complete entity-relationship diagram of the Model Registry database.</p>
   <p class="explore">View complete ERD →</p>
   </a>

   </div>


Database Documentation
----------------------

The database documentation also includes focused references for each
domain and the complete entity-relationship diagram.

.. toctree::
   :hidden:

   model-governance
   federated-learning
   drift-monitoring
   identity-rbac
   org-hierarchy
   bioprocess-runs
   hypertables
   operations-audit
   full-erd