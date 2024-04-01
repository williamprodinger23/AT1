from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User

def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("users:login"))
    return render(request, "users/user.html")

def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("eduprod:index"))
        else:
            messages.success(request, "Invalid Credentials.")
            return render(request, "users/login.html")
    return render(request, "users/login.html")

def logout_view(request):
    logout(request)
    messages.success(request, "Successfully logged out.")
    return redirect(reverse('users:login'))

def signup_view(request):
    return render(request, "users/signup.html")

def signup_run(request):
    if request.method == "POST":
        if request.POST["username"]:
            username = request.POST["username"]
        if request.POST["password"]:
            password = request.POST["password"]
        user = User.objects.create_user(username, '', password) #Create User With Submitted Username And Password
        user.save()
    return HttpResponseRedirect(reverse("eduprod:index"))
    
def data_change(request):
    return render(request, "admin")

