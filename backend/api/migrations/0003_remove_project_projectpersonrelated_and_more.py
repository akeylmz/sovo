# Generated by Django 5.1.1 on 2024-12-01 11:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_personrelated_remove_project_companyundertakingwork_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='ProjectPersonRelated',
        ),
        migrations.RemoveField(
            model_name='salesoffercard',
            name='Person_Related',
        ),
        migrations.RemoveField(
            model_name='salesoffercard_revise',
            name='Person_Related',
        ),
        migrations.AddField(
            model_name='project',
            name='CompanyUndertakingWork',
            field=models.CharField(blank=True, max_length=63, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='Person_Related',
            field=models.CharField(blank=True, max_length=63, null=True),
        ),
        migrations.AddField(
            model_name='salesoffercard',
            name='SalesPersonRelated',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='sales_person_related', to='api.personrelated'),
        ),
        migrations.AddField(
            model_name='salesoffercard_revise',
            name='SalesPersonRelated',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='sales_revise_person_related', to='api.personrelated'),
        ),
    ]
