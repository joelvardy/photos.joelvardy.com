<!DOCTYPE html>
<html>
	<head>

		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

		<title>Photos Taken By Joel Vardy</title>
		<meta name="description" content="I've taken thousands of photographs, have a look at this collection of my favourite ones." />

		<link rel="stylesheet" href="/assets/minified/design.css" />

		<script src="/assets/minified/app.js"></script>

	</head>
	<body ng-app='PhotosApp'>

		<div id="page" ng-view>

		</div>

		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			ga('create', 'UA-45404963-1', 'joelvardy.com');
			ga('send', 'pageview');
		</script>

	</body>
</html>
