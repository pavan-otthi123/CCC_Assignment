from flask import Flask,render_template, request, jsonify

import json

images = []

input = "No Images"

app = Flask(__name__)



@app.route("/")
def hello():
    return render_template("index.html")


@app.route("/display",methods=["GET", "POST"])

def display():
    
    
    image_data = "noimages"
    _class = ""
    if request.method == "POST":
        
        image_data = request.get_json()
        
        images.append(image_data)
        _class = image_data['cur_class']
        #input = (image_data['image'])
        #images.append(input)
        #return render_template('display.html',image_data=images)
        print(image_data["coord_0"],image_data["coord_1"],image_data["coord_2"],image_data["coord_3"])
    if len(images)!=0:
        return render_template('display.html',image_data=images)
    
    else:
        return render_template('fail.html')

if __name__ == "__main__":
 
    app.run(ssl_context=('server.crt', 'server.key'),host="0.0.0.0", port=8000,debug=True)