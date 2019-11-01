"""
A colleciton of functions to handle event invites on Resident Advisor
"""

import json
import sys
import ssl
import urllib.request
import time

def get_json_from_event(event_id, limit=2000):
    """
    Collect users from a given `event_id`.
    Return json structure as string.
    """
    url = "https://www.residentadvisor.net/WebServices/Rollcall.ashx?" \
          "friends=false&eventId={}&startRowNo=1&pageSize={}".format(event_id, limit)
    gcontext = ssl.SSLContext() # Removing TLS check so that I can burp
    gheaders = {
       "User-Agent": "" # Removing useragent so that cloudflare will STFU
    }
    req = urllib.request.Request(url, headers=gheaders)
    return urllib.request.urlopen(req ,context=gcontext).read()

def get_value_from_json(json_data, key):
    """
    Parse `key` value in `json_data`.
    Return list of values.
    """
    json_parsed = json.loads(json_data)
    ids = []
    for identity in json_parsed:
        ids.append(identity[key])
    return ids

def get_id_from_url(url):
    """
    Extract the id part from a RA event url.
    Example url https://www.residentadvisor.net/events/1337218
    Return event id.
    """
    return url.rsplit("/", 1)[1]

def main():
    """
    Take a url as argument and print out attendees usernames.
    """
    eventid = get_id_from_url(sys.argv[1])
    jsondata = get_json_from_event(eventid)
    ids = get_value_from_json(jsondata, "Username")
    for uid in ids:
        print(uid)

if __name__ == "__main__":
    main()
