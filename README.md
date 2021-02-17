# AxA Exam

## Tools Requirements
- [Python3.6+](https://www.python.org/downloads/)
- [Python virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/)
- [NodeJS](https://nodejs.org/en/)
- [Gulp](https://gulpjs.com/)

## Environment Setup and Running Middleware
1. Setup python virtualenv
    ```
    $ virtualenv env -p <python executable for python3.6>
    ```
1. Activate the virtualenv
    ### For MacOS / Linux:
    ```
    $ source env/bin/activate
    ```
    ### For Windows:
    ```
    > . env\Scripts\activate
    ```
1. Install Python Packages
    ```
    (env)$ pip install -r requirements.txt
    ```
1. Run flask server
    ```
    $ python application.py
    ```

## Running Front-End
1. Open new terminal
1. Install node packages
    ```
    $ npm install
    ```
1. Run gulp
    ```
    $ gulp dev
    ```
