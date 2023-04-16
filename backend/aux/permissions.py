from rest_framework.authtoken.models import Token
from users.models import Profile
from rest_framework.response import Response
from rest_framework import status

def permissions_checker(id, token):
    token_owner = token.user
    if (int(id) != token_owner.id):
        return True
