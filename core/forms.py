from django import forms
from .models import *

class GroupCreationForm(forms.ModelForm):
    """
    Form for creating a new group
    """
    class Meta:
        model = Group
        fields = ('name', 'description', 'schedule', 'location', 'quota', 'school')

    def __init__(self, *args, **kwargs):
        super(GroupCreationForm, self).__init__(*args, **kwargs)

        # Make these fields optional
        self.fields['schedule'].required = False
        self.fields['location'].required = False
        self.fields['quota'].required = False
        self.fields['school'].required = False

    def clean_quota(self):
        """
        Check if quota is valid
        """
        quota = self.cleaned_data['quota']
        if quota is not None and quota <= 0: # quota can be None, but if it's no it must be greater than 0
            raise forms.ValidationError('Quota must be greater than 0')
        return quota

    def clean(self):
        """
        Check that all fields (except quota) are valid
        """
        cleaned_data = super(GroupCreationForm, self).clean()
        return cleaned_data