from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        """Override this to put in:
            Users system checks
            Users signal registration
        """
        try:
            import faas.tasks  # noqa F401
        except ImportError:
            pass
