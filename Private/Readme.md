Install bower
=============
	sudo npm install -g bower
	bower install
Using bootstrap from bower
==========================
Add the following line in NeosBox.scss
	@import "../bower_components/bootstrap-sass/assets/stylesheets/bootstrap";

Overwrite variable bootstrap
============================
Add following lines before import
	$screen-xs:                  501px;
	$screen-sm:                  701px;
	$screen-md:                  901px;
	$screen-lg:                  1200px;
	@import "../bower_components/bootstrap-sass/assets/stylesheets/bootstrap";