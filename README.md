# dndjs
A Dungeons and Dragons (or simular) role play helper app/server. This works on any server, as long as your files in the server directory are run by node.js. It is, however, required to have a mysql server installed, for the server to connect to.

## Usage
If you want to use this project on your own server, feel free to clone this repositoy, or download it as a zip file. To run it, all you realy need to change is:
```
var baseUrl = 'mycoolsite-orip.com';
```
Located in js/master.js (line 2).


This address has to match the server address of your nodejs server. To run the nodejs server, run this in your default command line interpreter (assuming you have nodejs installed). Make sure your current working path is in the *server* directory.
```
npm install express
npm install mysql
node server.js
```
(Yes, I know, I should add a package.json <3)

## Security
To prevent people from downloading your server files (in case this is private for you, because mysql passwords for example) you will need to add an .htaccess file. Google will help you out with this anytime.
