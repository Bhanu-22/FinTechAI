from abc import ABC, abstractmethod
from typing import Optional, Dict, Any
from datetime import datetime
import re

# Abstract Base Class
class PlatformParser(ABC):
    @abstractmethod
    def parse_sms(self, sms_body: str) -> Optional[Dict[str, Any]]:
        """
        Parse an SMS body and return extracted earnings data
        or None if the SMS does not match the platform.
        """
        pass

# Uber Parser
class UberParser(PlatformParser):
    def parse_sms(self, sms_body: str) -> Optional[Dict[str, Any]]:
        if not sms_body or not isinstance(sms_body, str):
            return None

        patterns = [
            r'Uber.*?earned\s*₹?(\d+(?:\.\d+)?)',
            r'Uber.*?₹(\d+(?:\.\d+)?)\s*earned',
        ]

        for pattern in patterns:
            match = re.search(pattern, sms_body, re.IGNORECASE)
            if match:
                return {
                    "amount": match.group(1),
                    "date": datetime.now().date(),
                    "source": "SMS",
                    "raw_text": sms_body,
                }
        return None

# Zomato Parser
class ZomatoParser(PlatformParser):
    def parse_sms(self, sms_body: str) -> Optional[Dict[str, Any]]:
        if not sms_body or not isinstance(sms_body, str):
            return None

        patterns = [
            r'Zomato.*?earnings.*?₹?(\d+(?:\.\d+)?)',
            r'Zomato.*?₹(\d+(?:\.\d+)?)',
        ]

        for pattern in patterns:
            match = re.search(pattern, sms_body, re.IGNORECASE)
            if match:
                return {
                    "amount": match.group(1),
                    "date": datetime.now().date(),
                    "source": "SMS",
                    "raw_text": sms_body,
                }
        return None

# SMS Parser Orchestrator
class SMSParserService:
    def __init__(self):
        self.parsers = {
            "UBER": UberParser(),
            "ZOMATO": ZomatoParser(),
        }

    def parse_sms(self, sms_body: str) -> Optional[Dict[str, Any]]:
        if not sms_body or not isinstance(sms_body, str):
            return None

        for platform, parser in self.parsers.items():
            result = parser.parse_sms(sms_body)
            if result:
                result["platform"] = platform
                return result

        return None
