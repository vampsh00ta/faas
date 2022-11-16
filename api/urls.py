from django.urls import path
from . import  views
urlpatterns = [
    path('getWalletInfo/', views.GetWalletInfo.as_view()),
    path('BannedWallets/',views.BannedWallets.as_view())
]