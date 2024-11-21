
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.contrib.auth import authenticate, login
from django.conf import settings
import requests
import json
from rest_framework import viewsets, status
from django.contrib.auth.models import User 
from django.contrib.auth.models import Group as AuthUserGroups

import datetime
from django.db import transaction
from SERVICE import ins_logger
import sys
from os import path

from rest_framework import viewsets


class LoginCheck(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        try :
            
            # import pdb; pdb.set_trace()
            str_username = request.data['_UserId']
            str_password = request.data['_Password']
            user = authenticate(request, username=str_username, password=str_password)
            if user:
                if user.is_staff:
                    login(request, user)
                    token_json = requests.post(request.scheme+'://'+request.get_host()+'/api/token/',{'username':str_username,'password':str_password})
                    token = json.loads(token_json._content.decode("utf-8"))['access']
                    str_name = 'Super User'
                    email = user.email or ''
                    permission = {"NAME":"Add User","ADD":True,"EDIT":True,"VIEW":True,"DELETE":True,"DOWNLOAD":True,"PARENT":"USER","MENU":"MASTER"},{"NAME":"User List","ADD":True,"EDIT":True,"VIEW":True,"DELETE":True,"DOWNLOAD":True,"PARENT":"USER","MENU":"MASTER"}

                    userdetails={'Name':user.first_name,'int_user_id':user.id,'email':user.email}

                    return Response({'status':1,'token':token,"str_session_key":request.session.session_key,'permission':permission,'userdetails':userdetails})
            else:
                return Response({'status':0,'reason':'No user'})
        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            ins_logger.logger.error(e,extra={'details':'line no: ' + str(exc_tb.tb_lineno),'user': 'user_id:' + str(request.user.id)})
            return Response({'status':0,'reason':str(e)+ ' in Line No: '+str(exc_tb.tb_lineno)})
        


class SideBar(APIView):
    permission_classes=[AllowAny]
    def get(self,request):
        try :
            # import pdb; pdb.set_trace()
            dct_data = {
                "Master": [
                    {
                    "class": "has-arrow",
                    "extralink": False,
                    "icon": "mdi mdi-account-settings-variant",
                    "path": "",
                    "submenu": [
                        {
                        "class": "",
                        "extralink": False,
                        "icon": "mdi mdi-plus-outline",
                        "path": "/service/addservices",
                        "submenu": [],
                        "title": "Add Service"
                        },
                        {
                        "class": "",
                        "extralink": False,
                        "icon": "mdi mdi-plus-outline",
                        "path": "/service/followupservices",
                        "submenu": [],
                        "title": "Service Follow Up"
                        }
                    ],
                    "title": "Service"
                    }
                ]
                }

            data = dct_data

            return Response({'status':1,'data':data})
        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            ins_logger.logger.error(e,extra={'details':'line no: ' + str(exc_tb.tb_lineno),'user': 'user_id:' + str(request.user.id)})
            return Response({'status':0,'reason':str(e)+ ' in Line No: '+str(exc_tb.tb_lineno)})
        