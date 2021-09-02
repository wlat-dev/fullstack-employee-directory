# Fullstack Employee Directory

## Quickstart

First clone the repository

```bash
git clone https://github.com/wlat-dev/fullstack-employee-directory.git
```

### Backend
```
cd employee-directory-project/backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
```

Initialize database schema from SQLAlchemy within Python shell.
```
>>> from main import db
>>> db.create_all()
>>> exit()
```

To start the backend server on [http://localhost:5000](http://localhost:5000), run
```
python main.py
```
### Frontend

To start the React app in development mode, run
```
yarn start
```
And the React App may be viewed at [http://localhost:3000](http://localhost:3000).

Further commands may be found in the frontend Readme.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)