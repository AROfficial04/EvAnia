from django.shortcuts import render

def home(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def experiences(request):
    return render(request, 'experiences.html')

def gifts(request):
    return render(request, 'gifts.html')

def offers(request):
    return render(request, 'offers.html')

def book(request):
    return render(request, 'book.html')

def cart(request):
    return render(request, 'cart.html')

def login_view(request):
    return render(request, 'login.html')

def signup(request):
    return render(request, 'signup.html')

def contact(request):
    return render(request, 'contact.html')
