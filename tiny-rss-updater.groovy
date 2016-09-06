@Grab(group='org.codehaus.groovy.modules.http-builder', module='http-builder', version='0.7.2' )

import groovyx.net.http.*
import static groovyx.net.http.ContentType.*
import static groovyx.net.http.Method.*

//====================================================================

def env = System.getenv()
def tinyrss = env["TINY_RSS_URL"]?:"https://tiny-man.rhcloud.com" +"/api/"
def username = env["TINY_RSS_USERNAME"]
def password =  env["TINY_RSS_PASSWORD"]

def http = new groovyx.net.http.HTTPBuilder(tinyrss)
//Set JSON parser according to server response
http.parser.'text/json' = http.parser.'application/json'

def sessionId = login(http, username, password)
try { 
    getFeeds(http, sessionId).each { feed ->
        updateFeed ( http, sessionId, feed)
    }
} finally {
    logout(http, sessionId)
}

//====================================================================
def login(http, username, password) {
    def sessId
    http.request( POST, JSON ){ req ->
        body = ["op":"login","user": username, "password": password]
        response.success = { resp, json ->
           sessId = json?.content?.session_id
        }
    }
    if (!sessId) {
        throw new RuntimeException("Failed to log to Tiny RSS")
    }
    println "Successfully logged in"
    sessId
}

def getFeeds(http, sid) {
    def feeds = []
    http.request( POST, JSON ){ req ->
        body = ["op":"getFeeds","sid": sid, "cat_id": -3]
        response.success = { resp, json ->
           feeds = json.content
        }
    }
    feeds
}

def updateFeed(http, sid, feed) {
    http.request( POST, JSON ){ req ->
        body = ["op":"updateFeed","sid": sid, "feed_id": feed.id]
        response.success = { resp, json ->
           println "Updated feed ${feed.title}"
        }
    }
}

def logout(http, sid) {
    if (!sid) {
      return
    }
    http.request( POST, JSON ){ req ->
        body = ["op":"logout","sid": sid]
        response.success = { resp, json ->
           println "Successfully logged out"
        }
    }
}


