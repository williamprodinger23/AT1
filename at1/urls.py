from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('eduprod/', include(('eduprod.urls', 'eduprod'), namespace='eduprod')),
    path('users/', include(('users.urls', 'users'), namespace='users')),
    path('accounts/login/', include('users.urls')),
]