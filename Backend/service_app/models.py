from django.db import models
from django.contrib.auth.models import User 
# from .models import Location, StatusChart

# Create your models here.




class Service(models.Model):
    pk_bint_id = models.BigAutoField(primary_key=True)
    vchr_name = models.CharField(max_length=100)
    int_sales_type = models.IntegerField() # 0 - cash sales, 1 Non cash sales
    int_order = models.IntegerField()
    int_active = models.IntegerField() # 1-active, 0-deactive

    class Meta:        
        db_table = 'service_type'


class ServiceMaster(models.Model):
    pk_bint_id = models.BigAutoField(primary_key=True)
    dat_created = models.DateTimeField(blank=True, null=True)
    dat_updated = models.DateTimeField(blank=True, null=True)
    fk_created_by = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True,related_name = 'created_user')
    fk_updated_by = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True,related_name = 'updated_user')
    vchr_customer_name = models.CharField(max_length=50,null=True)
    bint_cust_phone = models.BigIntegerField(blank=True, null=True)
    fk_location = models.ForeignKey('service_app.Location',models.DO_NOTHING, blank=True, null=True,related_name="customer_location")
    dbl_outstanding = models.FloatField(blank=True, null=True) #sum(dbl_total_amt - servie_followup.dbl_paid_amt)
    dbl_total_amt = models.FloatField(blank=True, null=True)
    dbl_amount = models.FloatField(blank=True, null=True)
    dbl_service_charge = models.FloatField(blank=True, null=True)
    vchr_reference_num = models.CharField(max_length=50,null=True)
    vchr_remarks = models.TextField(blank=True, null=True)
    fk_status = models.ForeignKey('service_app.StatusChart',models.DO_NOTHING, blank=True, null=True,related_name="status_text")
    fk_ser_type = models.ForeignKey('service_app.Service',models.DO_NOTHING, blank=True, null=True,related_name="srvc_type")
    int_order = models.IntegerField()
    int_active = models.IntegerField() # 1-active, 0-deactive


    class Meta:      
        db_table = 'service_master'




class Country(models.Model):
    pk_bint_id = models.BigAutoField(primary_key=True)
    vchr_code = models.CharField(max_length=15, blank=True, null=True)
    vchr_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        db_table = 'country'

class States(models.Model):
    pk_bint_id = models.BigAutoField(primary_key=True)
    vchr_name = models.CharField(max_length=50, blank=True, null=True)
    vchr_code = models.CharField(max_length=100, blank=True, null=True)
    fk_country = models.ForeignKey(Country, models.DO_NOTHING, blank=True, null=True)
    chr_status = models.CharField(max_length=1, blank=True, null=True)
    vchr_gst_code = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        db_table = 'states'

class District(models.Model):
    pk_bint_id = models.BigAutoField(primary_key=True)
    vchr_name = models.CharField(max_length=100, blank=True, null=True)
    fk_state = models.ForeignKey(States, models.DO_NOTHING, blank=True, null=True)
    vchr_code = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        db_table = 'district'



class Location(models.Model):
    pk_bint_id = models.BigAutoField(primary_key=True)
    vchr_name = models.CharField(max_length=100, blank=True, null=True)
    vchr_pin_code = models.CharField(max_length=10, blank=True, null=True)
    vchr_district = models.CharField(max_length=50, blank=True, null=True)
    fk_state = models.ForeignKey(States, models.DO_NOTHING, blank=True, null=True)
    vchr_state = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        db_table = 'location'




class StatusChart(models.Model):
    pk_bint_id = models.BigAutoField(primary_key=True)
    vchr_name = models.CharField(max_length=100, blank=True, null=True)
    vchr_status_code = models.CharField(max_length=100, blank=True, null=True)
    int_order = models.IntegerField()
    int_active = models.IntegerField() # 1-active, 0-deactive

    class Meta:
        db_table = 'status_chart'




class ServiceFollowup(models.Model):
    pk_bint_id = models.BigAutoField(primary_key=True)
    fk_master = models.ForeignKey('ServiceMaster', models.DO_NOTHING)
    dat_created = models.DateTimeField(blank=True, null=True)
    fk_created = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)
    vchr_remark = models.CharField(max_length=500, blank=True, null=True)    
    int_status = models.IntegerField(blank=True, null=True) # 1 - latest , 0 - old
    dbl_paid_amt = models.FloatField(blank=True, null=True) 
    fk_status = models.ForeignKey('StatusChart', models.DO_NOTHING, blank=True, null=True,related_name = 'job_status')

    class Meta:        
        db_table = 'service_followup'
