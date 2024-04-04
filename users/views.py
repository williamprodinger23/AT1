from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User

def index(request):
    #if user is not authenticated take to login page
    #if user is authenticated take to user page
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("users:login"))
    return render(request, "users/user.html")

def login_view(request):
    #Check user for authentication with given username and password.
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            #User is authenticated
            #Log user in with build in Django Function
            #Take user to quiz app
            login(request, user)
            return HttpResponseRedirect(reverse("eduprod:index"))
        else:
            #User is not authenticated, take to login page
            messages.success(request, "Invalid Credentials.")
            return render(request, "users/login.html")
    return render(request, "users/login.html")

def logout_view(request):
    #Run built in Django Logout Function .
    #return message saying success.
    #Take user to login page.
    logout(request)
    messages.success(request, "Successfully logged out.")
    return redirect(reverse('users:login'))

def signup_view(request):
    return render(request, "users/signup.html") #Take User To Signup Page.

def signup_run(request):
    #Create User With Submitted Username And Password
    if request.method == "POST":
        if request.POST["username"]:
            username = request.POST["username"]
        if request.POST["password"]:
            password = request.POST["password"]
        user = User.objects.create_user(username, '', password)
        user.save()
    return HttpResponseRedirect(reverse("eduprod:index"))
    
def data_change(request):
    #Take user to admin page. (Database)
    return render(request, "admin")

