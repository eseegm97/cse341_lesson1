*A quick explanation of how to properly run this server*

To run this server, you can do one of two things:

1. Run "npm start" in your terminal, and then type "localhost:3000" in your browser
2. Visit the Render link provided in my assignment submission

Upon running the server, you will see that the browser returns a message that says "Not found". This is because the URL does not explicitly call for the name route by default. In order to call the name route, you must add "/name" to the end of the URL, and then enter the site. Your browser should now successfully call and display the correct name.

To view the data from the database, you will have to call the route for the collection in the URL as well, similar to calling the "name" route. The collection inside the database is called "Contacts", so at the end of the URL, you will have to include "/contacts" (make sure you use a lowercase "c"; the collection name has an uppercase "C", but the logic for the route uses lowercase). This should display all of the data that is included in the "Contacts" collection. If you would like to call only a specific document from the collection, you will have to include "/contacts?id=<insert_document_id>" at the end of your URL, but replace the "< >" with an actual document ID. For our purposes here, the three ID's are "696c1b18aa6332f616532ce2", "696c1b18aa6332f616532ce3", and "696c1b18aa6332f616532ce4". Including any one of these ID's in the URL will call only the specific document attached to that ID.