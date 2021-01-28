from django.shortcuts import render


def index(request):
    context = {
        'user': {
            'name': 'Mohamed'
        }
    }
    return render(request, "pages/home/index.html", context)


def about(request):
    context = {
        'title': 'About',
    }
    return render(request, "pages/about/about.html", context)
