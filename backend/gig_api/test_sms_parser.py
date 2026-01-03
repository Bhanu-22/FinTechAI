import unittest
from .services.sms_parser import SMSParserService

class TestSMSParser(unittest.TestCase):
    def setUp(self):
        self.parser = SMSParserService()

    def test_uber_earning_sms(self):
        sms = "Uber: You earned ₹450.75 for trip completed"
        result = self.parser.parse_sms(sms)

        self.assertIsNotNone(result)
        self.assertEqual(result["platform"], "UBER")
        self.assertEqual(result["amount"], "450.75")
        self.assertEqual(result["source"], "SMS")

    def test_zomato_earning_sms(self):
        sms = "Zomato: Your today's earnings are ₹320.00"
        result = self.parser.parse_sms(sms)

        self.assertIsNotNone(result)
        self.assertEqual(result["platform"], "ZOMATO")

    def test_non_earning_sms(self):
        sms = "Your OTP is 123456"
        result = self.parser.parse_sms(sms)

        self.assertIsNone(result)

    def test_invalid_sms_input(self):
        self.assertIsNone(self.parser.parse_sms(None))
        self.assertIsNone(self.parser.parse_sms(""))
