__author__     = "Joakim Lindbom"
__copyright__  = "Copyright 2019, Joakim Lindbom"
__date__       = "2019-11-09"

import unittest
import requests
import json

VER='V1'
PATH='profiles'

URL='https://profile-257621.appspot.com/'
PROFILE_URL=URL+VER+'/'+PATH+'/'

def GetProfile(id):
    '''
    Get with unique ID
    '''
    r = requests.get(PROFILE_URL + id)
    if r.status_code == 200:
        if "[{" in r.text:
            j = json.loads(r.text.strip("[").strip("]"))
            return r.status_code, j
        else:
            return r.status_code, None

def CreateProfileDict(ID):
    return {"customerID": ID,
            "username": "chandu1234",
            "firstName": "Joakim",
            "lastName": "Lindbom",
            "Address": "Gatan",
            "buildingNumber": "16",
            "city": "Helsingborg",
            "zip": "25252",
            "country": "Sweden",

            "mobileNumber": "+46789865443",

            "password": "asdhjhdfkjajsdhfjdhfkjds",

            "emailConsent": True,
            "directMailConsent": False,
            "emailAddress": "abc@gmail.com",

            "workNumber": "+468987654",
            "memberNumber": 123456789,
            "organisationName": "Dummy",

            "customerType": "Business",

            "smsConsent": False,
            "orgVatNumber": "123456789",
            "privacyPolicy": True,

            "discount": 10
               }

def CreateProfile(ID, profile):
    '''
    Generic creation a profile
    :param ID: Profile identity
    :param profile: The entire profile
    :return: Successful? True/False
    '''

    profile["customerID"] = ID

    headers = {'Content-Type': "application/json", 'Accept': "application/json"}
    r = requests.post(PROFILE_URL, headers=headers, json=profile)
    if r.status_code == 200:
        return "CustomerProfile" in r.text and "saved to DataStore" in r.text #TODO: Check how to verify

def DeleteProfile(ID):
    '''
    Generic creation a profile
    :param ID: Profile identity
    :return: Successful? True/False
    '''

    headers = {'Content-Type': "application/json", 'Accept': "application/json"}
    r = requests.delete(PROFILE_URL, headers=headers)
    if r.status_code == 404: # and "Cannot DELETE" in r.text:
        return False

    if r.status_code == 200:
        return "You are deleting entity" in r.text

def CheckKey(j, key, data):
    '''
    Check if a key exists and contains correct data
    '''
    if key in j:
        return j[key] == data
    else:
        return False


class ProfileAPI_tester(unittest.TestCase):
    def setUp(self):
        pass

    def test1_baseURL(self):
        '''
        Testing the base URL and Sigges welcome message
        '''
        r = requests.get(URL)
        self.assertEqual(r.status_code, 200)
        self.assertTrue("fubbickar" in r.text)

    def test1_GetProfile_Happy_Exists(self):
        '''
        Get existing customer
        '''

        ID='ADFGQW-1234-SDAASDA-12144'
        status_code, j = GetProfile(ID)
        self.assertEqual(status_code, 200)

        self.assertTrue(CheckKey(j, "username", "chandu1234"))

        self.assertTrue(CheckKey(j, "customerType", "Business"))
        self.assertTrue(CheckKey(j, "firstName", "chandu"))
        self.assertTrue(CheckKey(j, "lastName", "shashidhar"))
        self.assertTrue(CheckKey(j, "Address", "bankgatan"))
        self.assertTrue(CheckKey(j, "buildingNumber", "12A"))
        self.assertTrue(CheckKey(j, "zip", "22345"))
        self.assertTrue(CheckKey(j, "city", "lund"))
        self.assertTrue(CheckKey(j, "country", "Sweden"))

        self.assertTrue(CheckKey(j, "mobileNumber", "+46789865443"))

        self.assertTrue(CheckKey(j, "emailConsent", True))
        self.assertTrue(CheckKey(j, "emailAddress", "abc@gmail.com"))
        self.assertTrue(CheckKey(j, "directMailConsent", False))

        self.assertTrue(CheckKey(j, "smsConsent", False))
        self.assertTrue(CheckKey(j, "workNumber", "+468987654"))

        self.assertTrue(CheckKey(j, "organisationName", "Dummy"))
        self.assertTrue(CheckKey(j, "orgVatNumber", "123456789"))

        self.assertTrue(CheckKey(j, "privacyPolicy", True))

        self.assertTrue(CheckKey(j, "memberNumber", 987654321))

        # "password": "asdhjhdfkjajsdhfjdhfkjds",
        # "lastUpdate": "2019-11-09T12:45:00.000Z",
        # "createdDate": "2019-11-09T12:44:00.000Z",

    def test2_GetProfile_Happy_NonExisting(self):
        '''
        Get non-existing customer
        '''

        ID='FFFFFF-FFFF-FFFFFFF-FFFFF'
        status_code, j = GetProfile(ID)
        self.assertEqual(status_code, 200)
        self.assertIsNone(j)

    #@unittest.skip("This is not ready to be tested yet")
    def test3_CreateProfile_Happy_NonExisting(self):
        '''
        Create non-existing customer
        '''

        ID='123456-1234-1234567-00001'
        profile = CreateProfileDict(ID)

        self.assertTrue(DeleteProfile("123456-1234-1234567-00001"))
        #self.assertTrue(DeleteProfile("123456-1234-1234567-00002"))
        #self.assertTrue(DeleteProfile("123456-1234-1234567-00003"))
        self.assertTrue(CreateProfile("123456-1234-1234567-00001", profile))
        self.assertTrue(CreateProfile("123456-1234-1234567-00002", profile))
        self.assertTrue(CreateProfile("123456-1234-1234567-00003", profile))


    @unittest.skip("Awaiting resolving bug in CreateProfile API")
    def test1_CreateProfile_Existing(self):
        '''
        Create a profile that already exists. This should fail
        '''
        ID='123456-1234-1234567-00001'
        profile = CreateProfileDict(ID)

        self.assertTrue(DeleteProfile("123456-1234-1234567-00001"))
        self.assertTrue(CreateProfile("123456-1234-1234567-00001", profile))
        self.assertFalse(CreateProfile("123456-1234-1234567-00001", profile))

    def tearDown(self):
        pass

if __name__ == "__main__":
    suite = unittest.TestLoader().loadTestsFromTestCase(ProfileAPI_tester)
    unittest.TextTestRunner(verbosity=3).run(suite)
