# dndjs
A Dungeons and Dragons (or simular) role play helper app/server. This works on any server, as long as your files in the server directory are run by node.js. It is, however, required to have a mysql server installed, for the server to connect to. Also make sure you have a database named dungeons (unless you change this in database.js).

### Checklist
 - nodejs installed
 - apache2 (or different server)
 - mysql installed

## Usage
If you want to use this project on your own server, feel free to clone this repositoy, or download it as a zip file. To run it, all you really need to change is:
```
var baseUrl = 'mycoolsite-orip.com';
```
Located in js/master.js (line 2).


This address has to match the server address of your nodejs server. To run the nodejs server, run this in your default command line interpreter (assuming you have nodejs installed). Make sure your current working path is in the *server* directory.
```
npm install
node server.js
```
~(Yes, I know, I should add a package.json <3)~ Done

## Database
By default the database name should be 'dungeons'. If you want to change this, see database.js. Database scheme coming when its final.

### Tables
User
Inventory
Item

#### User
 - id
 - username
 - password
 - realname
 - rights

### Item
 - id
 - name
 - description
 - value
 - weight

## Security
To prevent people from downloading your server files (in case this is private for you, because mysql passwords for example) you will need to add an .htaccess file. Google will help you out with this anytime. Or, even easier, you could move the server directory to another place all together.

## Feedback
If you have any feedback, please file a pull request.
