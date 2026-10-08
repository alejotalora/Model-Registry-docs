# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html


# -- Project information -----------------------------------------------------

project = 'STAMM Model Registry'
copyright = '2026, Alejandro Otalora'
author = 'Alejandro Otalora'
release = '1.0'


# -- General configuration ---------------------------------------------------

extensions = [
    'myst_parser',
]

templates_path = ['_templates']
exclude_patterns = []


# -- Options for HTML output -------------------------------------------------

html_theme = 'alabaster'

html_static_path = ['_static']
html_css_files = ['custom.css']

# STAMM branding
html_logo = '_static/images/branding/logo-light.png'
html_title = 'STAMM Model Registry Documentation'


# -- Sidebar configuration ---------------------------------------------------

html_sidebars = {
    '**': [
        'globaltoc.html',
        'searchbox.html',
        'sourcelink.html',
        'relations.html',
    ],
}

html_theme_options = {
    # Keep the sidebar focused on the main documentation sections.
    'globaltoc_maxdepth': 1,
    'globaltoc_collapse': False,
    'globaltoc_includehidden': True,
}