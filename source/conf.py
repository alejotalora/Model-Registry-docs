# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see:
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

# Custom CSS
html_css_files = [
    'custom.css',
]

# Custom JavaScript for image zoom
html_js_files = [
    'image-zoom.js',
]

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
    'globaltoc_collapse': False,
    'globaltoc_includehidden': True,
}