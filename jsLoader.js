/************************************
 * Modular JavaScript
 * Used to load scripts to the page
 * using the following call
 *      jsLoader.load("windowSetup.js");
 *      created by Alan J Fitzpatrick
 ************************************/
 
jsLoader = (function() {
    "use strict";
    var scriptEntered = 0; 
    var scriptsLoaded = 0; // Incremented at script onload (we can compare these to check all scripts needed are loaded)
    var scriptsFailed = 0;
    
    // Private functions
    var _private = {
        getScriptCount: function() { // Returns an INT the numbers of scripts fully loaded to the page
            return scriptsLoaded; // INT
        },
        getScriptsEntered: function() { // Returns an INT the number of scripts initiated for loading to the page
            return scriptEntered; // INT
        },
        getFailedScripts: function() { // Returns an INT with the number of failed scripts
        	return scriptsFailed; //INT
        },
        checkAllScriptsLoaded: function() { // Returns a boolean of true or false, true when all scripts are loaded, also a check that this hasnt loaded to early            
          return scriptEntered == scriptsLoaded && scriptsLoaded !== 0; // BOOLEAN
        },
        loadScript: function(scriptLocation) { // This function accepts a script location and loads it into the page
            scriptEntered += 1;
            try{ // We are using a try block to output errors on load to the console and prevent erros being fed to the page
                var js = document.createElement('script');
                js.setAttribute("type","text/javascript");
                js.async = true;
                if (typeof js != "undefined") {
                    document.getElementsByTagName("head")[0].appendChild(js);
                }
                js.onload = js.onreadystatechange = function() {
                    scriptsLoaded += 1; 
                    _private.initCheck(); // run the function to check if all scripts have been loaded
                }
                js.setAttribute("src", scriptLocation); // we then set the src after the onload so the onload is captured
            } catch(error) { console.log("File: " + scriptLocation - "Failed to Load: " + error); scriptsFailed += 1; } 
        },
        initCheck: function() { 
            if(_private.checkAllScriptsLoaded) { // if all loaded run result
                console.log("Scripts Loaded");
            }
        }
    };
    
    // Public functions
    var _public = {
        count: _private.getScriptCount,
        load: _private.loadScript,
        check: _private.checkAllScriptsLoaded,
        failed: _private.getFailedScripts
    };
    
    // Return to global statement
    return _public;
})();
