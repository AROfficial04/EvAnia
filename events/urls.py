# file: D:\events\event_management\events\urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('experiences/', views.experiences, name='experiences'),
    path('gifts/', views.gifts, name='gifts'),
    path('offers/', views.offers, name='offers'),
    path('book/', views.book, name='book'),
    path('cart/', views.cart, name='cart'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup, name='signup'),
    path('contact/', views.contact, name='contact'),
]
