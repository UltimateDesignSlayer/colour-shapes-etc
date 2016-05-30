# colour-shapes-etc
App to learn colours, shapes, objects (household items, environemental items like trees, cars, etc), farm animals etc. Also can change shape/object colours.


### SVG tag creator from JSON legacy
My original idea of creating an SVG shape from JSON didn't really work out. Mainly the reason was because the origin of the idea came from creating drawing in HTML Canvas from JSON data. And it didn't really work with SVGs. In SVG we can have multiple shapes in each SVG and this would've made the JSON way too complex and unnecessarily difficult to manage.

See "Svg-tag-creator" branch for the progess.

My plan now is to have 1 SVG parent and multiple g elements with possible multple shapes within. 
