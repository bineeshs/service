from django.db import transaction
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from SERVICE import ins_logger 
from django.db.models import Q

from datetime import datetime
from django.db.models import F, Case, When, ExpressionWrapper, fields,Sum
from django.db.models.functions import ExtractDay,Trunc
from django.utils import timezone

import sys
from django.contrib.auth.models import User
from .models import *



import psycopg2.extras
from aldjemy.core import get_engine
from django.conf import settings
import psycopg2


userName = settings.DATABASES['default']['USER']
password = settings.DATABASES['default']['PASSWORD']
host = settings.DATABASES['default']['HOST']
database = settings.DATABASES['default']['NAME']
conn = psycopg2.connect(host=host,database=database, user=userName, password=password)
cur = conn.cursor()

engine = get_engine()
def addconnection():
    try:
        userName = settings.DATABASES['default']['USER']
        password = settings.DATABASES['default']['PASSWORD']
        host = settings.DATABASES['default']['HOST']
        database = settings.DATABASES['default']['NAME']
        conn = psycopg2.connect(host=host,database=database, user=userName, password=password)
        conn.autocommit = True
        return conn
    except Exception as e:
        print ("Cannot connect to Data Base..")
# Create your views here.





class ServiceTypeAPI(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        try:
            bln_admin = True  if request.user.groups.values().first()['name'] == 'ADMIN' else False
            ins_service = list(Service.objects.filter(int_active = 1).values('pk_bint_id','vchr_name','int_sales_type').order_by('int_order')) 

            return Response({'status':1,'service':ins_service,'bln_admin':bln_admin})
            

        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            ins_logger.logger.error(e, extra={'user': 'user_id:' + str(request.user.id),'details':'line no: ' + str(exc_tb.tb_lineno)})                
            return Response({'status':0,'message':str(e)})
        
class StatusChartAPI(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        try:            
            ins_status_code = list(StatusChart.objects.filter(int_active = 1).values('pk_bint_id','vchr_name','vchr_status_code').order_by('int_order').exclude(vchr_status_code__iexact = 'LOST'))

            ins_status_code_flwp = list(StatusChart.objects.filter(int_active = 1).values('pk_bint_id','vchr_name','vchr_status_code').order_by('int_order'))

            return Response({'status':1,'data':ins_status_code, 'status_data':ins_status_code_flwp})


        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            ins_logger.logger.error(e, extra={'user': 'user_id:' + str(request.user.id),'details':'line no: ' + str(exc_tb.tb_lineno)})                
            return Response({'status':0,'message':str(e)})
        
    def post(self,request):
        try:  
            if request.data.get('View') == 'viewdetails':        
                ins_status_code = list(StatusChart.objects.filter(int_active = 1).values('pk_bint_id','vchr_name','vchr_status_code').order_by('int_order'))

                return Response({'status':1,'data':ins_status_code})


        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            ins_logger.logger.error(e, extra={'user': 'user_id:' + str(request.user.id),'details':'line no: ' + str(exc_tb.tb_lineno)})                
            return Response({'status':0,'message':str(e)})
            

class LocationTypeahead(APIView):
    permission_classes = [AllowAny]
    def put(self,request):
        try:
            # import pdb; pdb.set_trace()
            str_search_term = request.data.get('strData')
            list_location=[]
            if str_search_term:
                list_location = list(Location.objects.filter(Q(vchr_name__icontains=str_search_term)|Q(vchr_pin_code__icontains=str_search_term)).values('pk_bint_id','vchr_name','vchr_pin_code','fk_state_id','vchr_state','fk_state__vchr_code'))

            return Response({'status':1,'data':list_location})

        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            ins_logger.logger.error(e, extra={'user': 'user_id:' + str(request.user.id),'details':'line no: ' + str(exc_tb.tb_lineno)})
            return Response({'status':0,'reason':e})
        


class AddServiceAPI(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        try:
            
            with transaction.atomic():
                # import pdb; pdb.set_trace()
                data = request.data
                user_id = request.user.id                


                ins_service_master = ServiceMaster.objects.create(
                                dat_created = data.get('date'),
                                dat_updated = None,
                                fk_created_by = request.user,
                                fk_updated_by = None,
                                vchr_customer_name = data.get('strCustomerName'),
                                bint_cust_phone = data.get('intCustomerNum'),
                                fk_location_id = data.get('intLocationId'),
                                dbl_outstanding = float(data.get('dblTotalAmount') or 0) - float(data.get('dblPaidAmount') or 0),
                                dbl_total_amt = data.get('dblTotalAmount'),
                                dbl_amount = data.get('dblAmount'),
                                dbl_service_charge = data.get('dblServCharge'),
                                vchr_reference_num = data.get('strReffNum'),
                                vchr_remarks = data.get('strRemarks'),
                                fk_status_id = data.get('intStatusId'), 
                                fk_ser_type_id = data.get('intServiceTypeId'),
                                int_order = 0,                               
                                int_active = 1,                
                            )
                


                ins_service_flwup = ServiceFollowup.objects.create (
                                fk_master = ins_service_master,
                                dat_created = data.get('date'),
                                fk_created_id = user_id,
                                vchr_remark =  data.get('strRemarks'),   
                                int_status = 1,
                                dbl_paid_amt = float(data.get('dblPaidAmount') or 0),
                                fk_status_id = data.get('intStatusId'),
                            )
                
                
                return Response({'status':1,'data':'Service saved successfully'})


        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            ins_logger.logger.error(e, extra={'user': 'user_id:' + str(request.user.id),'details':'line no: ' + str(exc_tb.tb_lineno)})
            return Response({'status':0,'reason':e})
        


class ServiceListAPI(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        try:
            
            connect = addconnection()
            cur2 = connect.cursor(cursor_factory = psycopg2.extras.RealDictCursor) 
            # import pdb; pdb.set_trace()
            datFrom = request.data.get('datFrom')
            start_date = datetime.strptime(datFrom, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%Y-%m-%d') if datFrom else None  
            datTo = request.data.get('datTo')
            end_date = datetime.strptime(datTo, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%Y-%m-%d') if datTo else None           
            
            
            
            str_query = """
                SELECT       
                    sm.pk_bint_id,
                    sf.fk_master_id,
                    sm.dat_created,
                    sf.vchr_remark,
                    sf.fk_status_id,
                    sm.dat_created AS fk_master_dat_created,
                    sm.vchr_customer_name,
                    sm.bint_cust_phone,
                    l.vchr_name AS fk_master_location_name,
                    sm.dbl_outstanding,
                    sm.dbl_total_amt,
                    sm.dbl_amount,
                    sm.dbl_service_charge,
                    sm.vchr_reference_num, 
                    sc.vchr_status_code as  vchr_status_code,
                    st.vchr_name as service_type,                     
                    CASE 
                        WHEN sf.int_status = 1 AND sc.vchr_status_code = 'LOST' THEN (sf.dat_created::date - sm.dat_created::date)
                        WHEN sf.int_status = 1 AND sc.vchr_status_code = 'COMPLETED & PAID' THEN (sf.dat_created::date - sm.dat_created::date)
                        ELSE (current_date - sm.dat_created::date)
                    END AS service_age
                FROM 
                    service_master sm
                    JOIN service_followup sf ON sf.fk_master_id = sm.pk_bint_id
                    JOIN status_chart sc ON sc.pk_bint_id = sm.fk_status_id
                    JOIN service_type st ON st.pk_bint_id = sm.fk_ser_type_id
                    LEFT JOIN location l ON sm.fk_location_id = l.pk_bint_id
                WHERE 
                    sf.int_status = 1  {dat_filter} {str_new_filter}                   
                """
                
            dat_filter = ''
            str_new_filter = ''
            
            if not request.data.get('master_id'):
                dat_filter = """ AND sm.dat_created::date BETWEEN '""" +start_date+ """' and '"""+end_date+"""' """             

            if request.data.get('master_id'):
                str_new_filter +=  """ AND sm.pk_bint_id IN (""" +str(request.data['master_id'])+ """)"""

            if request.data.get('service'):
                str_new_filter += " AND st.pk_bint_id IN (" + ",".join(map(str, request.data['service'])) + ")"

            if request.data.get('status'):                
                str_new_filter += " AND sc.pk_bint_id IN (" + ",".join(map(str, request.data['status'])) + ")"

            
            str_query = str_query.format(dat_filter=dat_filter,str_new_filter = str_new_filter)
            cur2.execute(str_query)
            lst_data = cur2.fetchall()
            total_dbl_paid_amt = 0
            # import pdb; pdb.set_trace()
            if request.data.get('master_id'): 
                lst_single_data = []               
                for row in lst_data:
                    dct_data ={}
                    dct_data["pk_bint_id"] = row['pk_bint_id']
                    dct_data["fk_master_id"] = row['fk_master_id']
                    dct_data["dat_created"] = row['dat_created']
                    dct_data["vchr_remark"] = row['vchr_remark']
                    dct_data["fk_status_id"] = row['fk_status_id']
                    dct_data["fk_master_dat_created"] = row['fk_master_dat_created']
                    dct_data["fk_master_location_name"] = row['fk_master_location_name']
                    dct_data["dbl_outstanding"] = row['dbl_outstanding']
                    dct_data["dbl_total_amt"] = row['dbl_total_amt']
                    dct_data["dbl_amount"] = row['dbl_amount']
                    dct_data["dbl_service_charge"] = row['dbl_service_charge']
                    dct_data["vchr_reference_num"] = row['vchr_reference_num']
                    dct_data["vchr_status_code"] = row['vchr_status_code']
                    dct_data["service_type"] = row['service_type']
                    dct_data["service_age"] = row['service_age']
                    dct_data["vchr_customer_name"] = row['vchr_customer_name']
                    dct_data["bint_cust_phone"] = row['bint_cust_phone']

                    ins_follow_up = ServiceFollowup.objects.filter(fk_master_id = row['pk_bint_id']).values('dbl_paid_amt')
                    for data in ins_follow_up:
                        total_dbl_paid_amt += float(data.get('dbl_paid_amt') or 0)

                    dct_data["total_dbl_paid_amt"] = total_dbl_paid_amt
                    lst_single_data.append(dct_data)
                
                return JsonResponse({'status':1,'data':lst_single_data})           

            return JsonResponse({'status':1,'data':lst_data})


        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            ins_logger.logger.error(e, extra={'user': 'user_id:' + str(request.user.id),'details':'line no: ' + str(exc_tb.tb_lineno)})
            return Response({'status':0,'reason':e})
        

    def put(self,request):
        try:
            with transaction.atomic():
                # import pdb; pdb.set_trace()
                dct_master = request.data.get('master')
                dct_new_status = request.data.get('statusId')

                

                ins_master_old = ServiceMaster.objects.filter(pk_bint_id = dct_master.get('fk_master_id')).get()

                if dct_new_status['vchr_status_code'] == 'COMPLETED AND PAID' and (ins_master_old.dbl_outstanding -  float(dct_master.get('PaidAmount') or 0)) !=0:
                    return Response({'status':0,'msg':'Plase clear the due amount'})

                ins_service_master = ServiceMaster.objects.filter(pk_bint_id = dct_master.get('fk_master_id')).update(
                    vchr_remarks =  dct_master.get('vchr_remark'),
                    dbl_outstanding = ins_master_old.dbl_outstanding -  float(dct_master.get('PaidAmount') or 0),
                    fk_status_id = dct_new_status['pk_bint_id'],
                    dat_updated = datetime.now(),
                    fk_updated_by = request.user,
                    int_active = 0 if ins_master_old.dbl_outstanding -  float(dct_master.get('PaidAmount') or 0) == 0 else 1,
                )

                ins_service_flwup_old = ServiceFollowup.objects.filter(fk_master_id = dct_master.get('pk_bint_id')).last()
                ins_service_flwup_old.int_status = 0
                ins_service_flwup_old.save()                


                ins_service_flwup = ServiceFollowup.objects.create (
                                fk_master = ins_master_old,
                                dat_created = datetime.now(),
                                fk_created = request.user,
                                vchr_remark =  dct_master.get('vchr_remark'),   
                                int_status = 1,
                                dbl_paid_amt = float(dct_master.get('PaidAmount') or 0),
                                fk_status_id = dct_new_status['pk_bint_id'],
                            )
            
                return Response({'status':1,'data':'SuccessFully Updated'})
            
        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            ins_logger.logger.error(e, extra={'user': 'user_id:' + str(request.user.id),'details':'line no: ' + str(exc_tb.tb_lineno)})
            return Response({'status':0,'reason':e})
        
        



        
