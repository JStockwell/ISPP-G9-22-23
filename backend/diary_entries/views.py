from rest_framework.views import APIView
from diary_entries.models import PhysicalEntry, MentalEntry
from diary_entries.serializer import PhysicalEntrySerializer, MentalEntrySerializer, CreateSerializer
from rest_framework.response import Response
from rest_framework import status


class MentalEntryList(APIView):
    def get(self, request):
        mental_entries = MentalEntry.objects.all()
        serializer = MentalEntrySerializer(mental_entries, many=True)
        return Response(serializer.data)

class MentalEntryCreate(APIView):
    def post(self, request):
        serializer = MentalEntrySerializer(data = request.data)
        
        if(serializer.is_valid() and serializer.is_valid()):
            date = serializer.data["date"]
            state = serializer.data["state"]
            weather = serializer.data["weather"]
            food = serializer.data["food"]
            sleep = serializer.data["sleep"]
            positive_thoughts = serializer.data["positive_thoughts"]
            negative_thoughts = serializer.data["negative_thoughts"]
            notes = serializer.data["notes"]

            mental_entry = MentalEntry(date = date, state = state, weather = weather, food = food, sleep = sleep,
                                      positive_thoughts = positive_thoughts, negative_thoughts = negative_thoughts, notes = notes)

            mental_entry.save()
            
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class MentalEntryId(APIView):
    def get_mental_entry_by_pk(self, pk):
        try:
            return MentalEntry.objects.get(id=pk)
        except(AttributeError):
            return Response({"error":"Esa entrada de diario mental no existe"}, status=status.HTTP_404_NOT_FOUND)
    
    def get(self, request, pk):
        mental_entry = self.get_mental_entry_by_pk(pk)
        serializer = MentalEntrySerializer(mental_entry)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        mental_entry = self.get_mental_entry_by_pk(pk)
        mental_entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PhysicalEntryList(APIView):
    def get(self, request):
        physical_entry = PhysicalEntry.objects.all()
        serializer = PhysicalEntrySerializer(physical_entry, many=True)
        return Response(serializer.data)


class PhysicalEntryCreate(APIView):
    def post(self, request):
        serializer = PhysicalEntrySerializer(data = request.data)
        
        if (serializer.is_valid()):
            date = serializer.data["date"]
            state = serializer.data["state"]
            body_parts = serializer.data["body_parts"]
            notes = serializer.data["notes"]

            physical_entry = PhysicalEntry(date = date, state = state, body_parts = body_parts, notes = notes)

            physical_entry.save()

            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class PhysicalEntryId(APIView):
    def get_physical_entry_by_pk(self, pk):
        try:
            return PhysicalEntry.objects.get(id=pk)
        except(AttributeError):
            return Response({"error":"Esa entrada de diario físico no existe"}, status=status.HTTP_404_NOT_FOUND)
    
    def get(self, request, pk):
        physical_entry = self.get_physical_entry_by_pk(pk)
        serializer = PhysicalEntrySerializer(physical_entry)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        physical_entry = self.get_physical_entry_by_pk(pk)
        physical_entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)