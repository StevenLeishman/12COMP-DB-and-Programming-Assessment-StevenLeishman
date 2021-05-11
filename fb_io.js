/**************************************************************/
// fb_io.js
// Written by steven leishman 2021
//v1 base code from firebase miniskills
//v2 Switchs to registration if there is no record when login pressed 
//V3 
/**************************************************************/
loginStatus = ''
readStatus = ''
writeStatus = ''
/**************************************************************/
// fb_initialise()
// Called by: setup
// Initialize firebase
// Input:  n/a
// Return: n/a
/**************************************************************/
function fb_initialise() {
	console.log('fb_initialise: ');
	//PLACE YOUR CONFIG FROM THE FIREBASE CONSOLE BELOW <========
	var firebaseConfig = {
		apiKey: "AIzaSyDWSmdn_LePepzgPUQkmI1ws676ev2w7NY",
		authDomain: "comp-2021-steven-leishman.firebaseapp.com",
		projectId: "comp-2021-steven-leishman",
		storageBucket: "comp-2021-steven-leishman.appspot.com",
		messagingSenderId: "617114748289",
		appId: "1:617114748289:web:b0a1e31ac1f4e718c85480",
		measurementId: "G-WCQ2BZFPD7"
	};

	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	console.log(firebase);

	database = firebase.database();
}

/**************************************************************/
// fb_login(_dataRec)
// Login to Firebase
// Called by: Login button
// Input:  to store user info in
// Return: n/a
/**************************************************************/
function fb_login(_dataRec) {
	console.log('fb_login: dataRec= ' + _dataRec);
	loginStatus = 'Pending';
	ui_changeHTML("p_loginStatus","Login Status = " + loginStatus)

	firebase.auth().onAuthStateChanged(newLogin);
	function newLogin(_user) {
		if (_user) {
			// user is signed in
			_dataRec.uid = _user.uid;
			_dataRec.email = _user.email;
			_dataRec.name = _user.displayName;
			_dataRec.photoURL = _user.photoURL;
			loginStatus = 'Logged in, please wait';
			ui_changeHTML("p_loginStatus","Login Status = " + loginStatus)
			console.log('fb_login: status = ' + loginStatus);

			//Call read function to 
			fb_readRec(DETAILS, userDetails.uid, userDetails, fb_processUserDetails)
		}
		else {
			// user NOT logged in, so redirect to Google login
			_dataRec = {};

			loginStatus = 'Logged out';
			console.log('fb_login: status = ' + loginStatus);
			ui_changeHTML("p_loginStatus","Login Status = " + loginStatus)

			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithRedirect(provider);

		}
	}


}

/**************************************************************/
// fb_logout()
// Logout of Firebase
// Called by: Logout button
// Input:  n/a
// Return: n/a
/**************************************************************/
function fb_logout() {
	console.log('fb_logout: ');
	firebase.auth().signOut();
	window.close()
}

/**************************************************************/
// fb_writeRec(_path, _key, _data)
// Write a specific record & key to the DB
// Called by: Submit Registration button, 
// Input:  path to write to, the key, data to write
// Return: 
/**************************************************************/
function fb_writeRec(_path, _key, _data) {
	console.log('fb_WriteRec: path= ' + _path + '  key= ' + _key +
		'  data= ' + _data.name + '/' + _data.score);

	writeStatus = "Pending"
	firebase.database().ref(_path + '/' + _key).update(_data,
		function (error) {
			if (error) {
				writeStatus = "Failure"
				console.log(error)
			} else {
				writeStatus = "OK"
			}
		}
	);
}

/**************************************************************/
// fb_readAll(_path, _save,_functionToCall)
// Read all DB records for the path
// Input:  path to read from and where to save it and function
// to call to process db data
// Return:
/**************************************************************/
function fb_readAll(_path, _save, _functionToCall) {
	console.log('fb_readAll: path= ' + _path);

	firebase.database().ref(_path).once("value", gotRecord, readErr)
	readStatus = "Pending"
	function gotRecord(snapshot) {
		if (snapshot.val() == null) {
			readStatus = "No Record"
			console.log(readStatus)
		} else {
			console.log(readStatus)
			readStatus = "OK"
			let dbData = snapshot.val()
			console.log(dbData)

			_functionToCall(readStatus, dbData,_save)
		}
	}

	function readErr(error) {
		if (error) {
			readStatus = "fail"
			console.log(error)
		}
	}
}

/**************************************************************/
// fb_readRec(_path, _key, _save,_functionToCall)
// Read a specific DB record
// Input:  path & key of record to read and where to save it
// and a function to process it
// Return:  
/**************************************************************/
function fb_readRec(_path, _key, _save, _functionToCall) {
	console.log('fb_readRec: path= ' + _path + '  key= ' + _key);

	firebase.database().ref(_path + '/' + _key).once("value", gotRecord, readErr)
	readStatus = "Pending"
	console.log("readStatus = " + readStatus)
	function gotRecord(snapshot) {
		let dbData = snapshot.val()
		if (snapshot.val() == null) {
			//If no record
			readStatus = "No Record"
			console.log("readStatus = " + readStatus)
			_functionToCall(readStatus,dbData, _save)

		} else {
			// if record
			readStatus = "OK"
			console.log("readStatus = " + readStatus)

			_functionToCall(readStatus,dbData, _save)
		}
	}

	function readErr(error) {
		if (error) {
			readStatus = "fail"
			console.log("readStatus = " + readStatus)
			console.log(error)
		}
	}
}

/**************************************************************/
// fb_processUserStats
// Reads all userStats keys for leaderboard
// Called by: fb_readAll
// Input: key to read from and where to save it to 
// Return:  
/**************************************************************/
function fb_processUserStats(_result,_dbData, _save) {
	let dbKeys = Object.keys(_dbData)
	for (i = 0; i < dbKeys.length; i++) {
		let key = dbKeys[i]
		_save.push({
			gameName: _dbData[key].gameName,
			highScore: _dbData[key].highScore
		});
	}
	
}
/**************************************************************/
// fb_processUserDetails
// processess code given by read rec and saves it to user Object
// Called by: fb_readRec()
// Input: code to process and where to save it
// Return:  
/**************************************************************/
function fb_processUserDetails(_result,_dbData, _save) {
	console.log("fb_processUserDetails" + " _result = " + _result + " _save = " + _save)
	if(_result == "No Record"){
		//Switch to register page if no recrod
		ui_switchScreens("s_landPg", "s_regPg");

		document.getElementById("p_regName").innerHTML = userDetails.name
		document.getElementById("p_regEmail").innerHTML = userDetails.email
	} else {
		//if record save it to user object
		_save.email = _dbData.email;
		_save.name = _dbData.name;
		_save.photoURL = _dbData.photoURL;
		_save.age = _dbData.age;
		_save.gender = _dbData.gender;
		_save.phone = _dbData.phone;
		_save.city = _dbData.city;
		_save.suburb = _dbData.suburb;
		_save.streetName = _dbData.streetName;
		_save.houseNumber = _dbData.houseNumber;
		_save.postalCode = _dbData.postalCode;
		_save.backAccount = _dbData.backAccount;

		console.log("_dbData = " + _dbData + "  _save = " + _save)

		// switch screens to home page
		ui_switchScreens("s_landPg","s_homePg")
	}

	
}

/**************************************************************/
//    END OF PROG
/**************************************************************/