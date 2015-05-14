// Clear Search
// ==========================
var $searchBar   = $('#searchBar'),
    $search      = $('#search'),
    $clearSearch = $('#clearSearch'),
    $results     = $('#results'),
    $homeDiv     = $('#home'),
    //blacklist of quickstarts that can not be imported in JBT/JBDS
    blacklist    = ['h2-console', 'kitchensink-cordova-contacts', 'kitchensink-cordova', 'push-helloworld-cordova'],
    results      = [],
    wizards = [{"id":"html5.wizard","label":"HTML5 Project","description":"HTML 5 Project is a sample, deployable Maven 3 project to help you get started developing a Mobile HTML5 web application on JBoss Enterprise Application Platform 6 or JBoss Application Server 7.1.\n This project creates a pure HTML5 based front end which interacts with server side content through RESTful endpoints.","iconUrl":"images/icon-html5.png",},{"id":"openshift.wizard","label":"OpenShift Application","description":"Create any kind of application and deploy it in the cloud using OpenShift from Red Hat.","iconUrl":"images/icon-openshift.gif",},{"id":"forge.wizard","label":"AngularJS Forge","description":"This project is a sample project that will show how to build an JavaEE application with AngularJS, HTML5 and Bootstrap 3 by using JBoss Forge. \nThe application is deployable to JBoss Enterprise Platform 6 or JBoss Application Server 7.1 or higher.","iconUrl":"images/icon-default.png",},{"id":"javaee.wizard","label":"Java EE Web Project","description":"Java EE Web Project is a sample, deployable Maven 3 project to help you get your foot in the door developing with Java EE 6 on JBoss Enterprise Application Platform 6 or JBoss Application Server 7.1. \nThis project is setup to allow you to create a compliant Java EE 6 application using JSF 2.0, CDI 1.0, EJB 3.1, JPA 2.0 and Bean Validation 1.0.","iconUrl":"images/icon-javaee.gif",},{"id":"maven.wizard","label":"Maven Project","description":"Create a Maven-based project.","iconUrl":"images/icon-default.png",},{"id":"hybrid.mobile.wizard","label":"Hybrid Mobile Project","description":"Create a hybrid mobile application using Apache Cordova for cross-platform mobile development.","iconUrl":"images/icon-hybridmobile.gif",}]
	favorites = [{"id":"jbossdeveloper_quickstart-09f74407","label":"forge-from-scratch","title":"forge-from-scratch: Shows How Forge Can Generate an Application","description":"The `forge-from-scratch` quickstart demonstrates how *JBoss Forge 2* can generate a Java EE (JPA, EJB 3.1, JAX-RS, JSF) web-enabled database application.","tags":["product:EAP-7.0.GA","Forge"]}];
	showOnStartup = true;


var searchResults = [{"id":"jbossdeveloper_quickstart-d66221c3","label":"xml-jaxp","title":"xml-jaxp: Upload and Parse an XML File Using DOM or SAX","description":"The `xml-jaxp` quickstart demonstrates how to use Servlet and JSF to upload an XML file to JBoss EAP and validate and parse it using DOM or SAX.","tags":["DOM","Servlet","SAX","JAXP"]},{"id":"jbossdeveloper_quickstart-09f74407","label":"forge-from-scratch","title":"forge-from-scratch: Shows How Forge Can Generate an Application","description":"The `forge-from-scratch` quickstart demonstrates how *JBoss Forge 2* can generate a Java EE (JPA, EJB 3.1, JAX-RS, JSF) web-enabled database application.","tags":["product:EAP-7.0.GA","Forge"]},
                     {"id":"jbossdeveloper_quickstart-7aa80b86","label":"ejb-security","title":"ejb-security:  Using Java EE Declarative Security to Control Access","description":"The `ejb-security` quickstart demonstrates the use of Java EE declarative security to control access to Servlets and EJBs in JBoss EAP.","tags":["EJB","Security"]},{"id":"jbossdeveloper_quickstart-e927771a","label":"h2-console","title":"h2-console: Example Using the H2 Console with JBoss EAP","description":"The `h2-console` quickstart demonstrates how to use the H2 Console that is bundled with and built specifically for JBoss EAP.","tags":["H2"]},{"id":"jbossdeveloper_quickstart-5f6f6254","label":"jts","title":"jts: Java Transaction Service - Distributed EJB Transactions","description":"The `jts` quickstart shows how to use JTS to perform distributed transactions across multiple containers, fulfilling the properties of an ACID transaction.","tags":["JTS"]},{"id":"jbossdeveloper_quickstart-55d9a642","label":"cluster-ha-singleton","title":"cluster-ha-singleton: A SingletonService Started by a SingletonStartup","description":"The `cluster-ha-singleton` quickstart deploys a Service, wrapped with the SingletonService decorator, and used as a cluster-wide singleton service.","tags":["HASingleton","JNDI","EJB"]},{"id":"jbossdeveloper_quickstart-e0f66336","label":"bean-validation-custom-constraint","title":"bean-validation-custom-constraint: Bean Validation Using Custom Constraints","description":"The `bean-validation-custom-constraint` quickstart demonstrates how to use the Bean Validation API to define custom constraints and validators.","tags":["BV","CDI","JPA"]},{"id":"jbossdeveloper_quickstart-8c871579","label":"kitchensink-ear","title":"kitchensink-ear: Using Multiple Java EE 6 Technologies Deployed as an EAR","description":"The `kitchensink-ear` quickstart demonstrates web-enabled database application, using JSF, CDI, EJB, JPA and Bean Validation, packaged as an EAR.","tags":["BV","EAR","CDI","JPA","JSF","EJB","JAX-RS"]},{"id":"jbossdeveloper_quickstart-f04f101b","label":"cdi-veto","title":"cdi-veto: A Simple CDI Portable Extension Example","description":"The `cdi-veto` quickstart is a simple CDI Portable Extension that uses SPI classes to show how to remove beans and inject JPA entities into an application.","tags":["CDI"]},{"id":"jbossdeveloper_quickstart-cf8f65ad","label":"bean-validation","title":"bean-validation: Bean Validation Tested Using Arquillian","description":"The `bean-validation` quickstart provides Arquillian tests to demonstrate how to use CDI 1.0, JPA 2.0 and Bean Validation 1.0.","tags":["BV","CDI","JPA"]},{"id":"jbossdeveloper_quickstart-7abbd519","label":"tasks","title":"tasks: Test JPA with Arquillian","description":"The `tasks` quickstart includes a persistence unit and sample persistence code to demonstrates how to use JPA 2.0 for database access in JBoss EAP.","tags":["JPA","Arquillian"]},{"id":"jbossdeveloper_quickstart-11a4307c","label":"helloworld-mdb-propertysubstitution","title":"helloworld-mdb-propertysubstitution: MDB (Message-Driven Bean) Using Property Substitution","description":"The `helloworld-mdb-propertysubstitution` quickstart demonstrates the use of *JMS 1.1* and *EJB 3.1 MDB*, enabling property substitution with annotations.","tags":["JMS","MDB","EJB"]},{"id":"jbossdeveloper_quickstart-8bc46068","label":"greeter","title":"greeter: Demonstrates CDI, JPA, JTA, EJB 3.1, and JSF","description":"The `greeter` quickstart demonstrates the use of *CDI 1.0*, *JPA 2.0*, *JTA 1.1*, *EJB 3.1* and *JSF 2.1* in JBoss EAP.","tags":["JTA","CDI","JPA","JSF","EJB"]},{"id":"jbossdeveloper_quickstart-c3acf4be","label":"temperature-converter","title":"temperature-converter: Stateless Session EJB (SLSB)","description":"The `temperature-converter` quickstart does temperature conversion using an *EJB 3.1 Stateless Session Bean* (SLSB), *CDI*, and a *JSF* front-end client.","tags":["CDI","SLSB EJB","JSF"]},{"id":"jbossdeveloper_quickstart-63c4c140","label":"wsba-coordinator-completion-simple","title":"wsba-coordinator-completion-simple: Example of a WS-BA Enabled JAX-WS Web Service","description":"The `wsba-coordinator-completion-simple` quickstart deploys a WS-BA (WS Business Activity) enabled JAX-WS Web service WAR (CoordinatorCompletion protocol).","tags":["WS-BA","JAX-WS"]},{"id":"jbossdeveloper_quickstart-30255298","label":"cdi-alternative","title":"cdi-alternative: Demonstrates CDI Alternatives","description":"The `cdi-alternative` quickstart demonstrates how to create a bean that can be implemented for different purposes without changing the source code.","tags":["JSP","CDI","Servlet"]},{"id":"jbossdeveloper_quickstart-d2f65af3","label":"ejb-asynchronous","title":"ejb-asynchronous: EJB with asynchronous methods","description":"The `ejb-asynchronous` quickstart demonstrates the behavior of asynchronous EJB invocations by a deployed EJB and a remote client and how to handle errors.","tags":["Asynchronous EJB"]},{"id":"jbossdeveloper_quickstart-c4b63524","label":"mail","title":"mail: E-Mail Example using CDI and JSF","description":"The `mail` quickstart demonstrates how to send email using CDI 1.0 and JSF 2.1 and the default Mail provider that ships with JBoss EAP.","tags":["JavaMail","CDI","JSF"]},{"id":"jbossdeveloper_quickstart-7d1094da","label":"ejb-in-ear","title":"ejb-in-ear: Deployment of an EAR Containing a JSF WAR and EJB JAR","description":"The `ejb-in-ear` quickstart demonstrates how to deploy an EAR archive that contains a *JSF 2.1* WAR and an *EJB 3.1* JAR.","tags":["EAR","EJB"]},{"id":"jbossdeveloper_quickstart-3f82586e","label":"cdi-interceptors","title":"cdi-interceptors: Example Using CDI Interceptors","description":"The `cdi-interceptors` quickstart demonstrates how to use CDI interceptors for cross-cutting concerns such as logging and simple auditing.","tags":["JPA","JSF","EJB"]},{"id":"jbossdeveloper_quickstart-e7abf822","label":"app-client","title":"app-client: Use the JBoss EAP Application Client Container","description":"The `app-client` quickstart demonstrates how to code and package a client app and use the JBoss EAP client container to start the client Main program.","tags":["EAR","AppClient","EJB"]},{"id":"jbossdeveloper_quickstart-fdec999a","label":"kitchensink-ml-ear","title":"kitchensink-ml-ear: Localized Version of the kitchensink-ear Quickstart","description":"The `kitchensink-ml-ear` quickstart demonstrates a localized database application, using JSF, CDI, EJB, JPA and Bean Validation, packaged as an EAR.","tags":["l10n","BV","EAR","CDI","JPA","JSF","EJB","JAX-RS","i18n"]},{"id":"jbossdeveloper_quickstart-05dc10e8","label":"kitchensink-ml","title":"kitchensink-ml: Localized Version of the kitchensink Quickstart","description":"The `kitchensink-ml` quickstart demonstrates a localized Java EE 6 compliant application using JSF, CDI, EJB, JPA and Bean Validation.","tags":["l10n","BV","CDI","JPA","JSF","EJB","JAX-RS","i18n"]},{"id":"jbossdeveloper_quickstart-9a356589","label":"bmt","title":"bmt: Bean Managed Transactions with JPA and JTA","description":"The `bmt` quickstart demonstrates Bean-Managed Transactions (BMT), showing how to manually manage transaction demarcation while accessing JPA entities.","tags":["BMT","EJB"]},{"id":"jbossdeveloper_quickstart-6af0aa62","label":"ejb-timer","title":"ejb-timer: Example of EJB Timer Service - @Schedule and @Timeout","description":"The `ejb-timer` quickstart demonstrates how to use the EJB 3.1 timer service `@Schedule` and `@Timeout` annotations with JBoss EAP.","tags":["EJB 3.1 Timer"]},{"id":"jbossdeveloper_quickstart-0eb538cc","label":"cdi-portable-extension","title":"cdi-portable-extension: CDI Portable Extension","description":"The `cdi-portable-extension` quickstart demonstrates a simple CDI Portable Extension that uses SPI classes to inject beans with data from an XML file.","tags":["CDI"]},{"id":"jbossdeveloper_quickstart-2eb1d12a","label":"helloworld-mdb","title":"helloworld-mdb: Helloworld Using an MDB (Message-Driven Bean)","description":"The `helloworld-mdb` quickstart uses *JMS 1.1* and *EJB 3.1 Message-Driven Bean* (MDB) to create and deploy JMS topic and queue resources in JBoss EAP.","tags":["JMS","MDB","EJB"]},{"id":"jbossdeveloper_quickstart-736ab533","label":"cdi-stereotype","title":"cdi-stereotype: Example Using CDI Stereotype.","description":"The `cdi-stereotype` quickstart demonstrates how to apply CDI stereotypes to beans to encapsulate CDI interceptor bindings and CDI alternatives.","tags":["JPA","JSF","EJB"]},{"id":"jbossdeveloper_quickstart-c07fd3a1","label":"helloworld-jms","title":"helloworld-jms: Helloworld JMS Example","description":"The `helloworld-jms` quickstart demonstrates the use of external JMS clients with JBoss EAP.","tags":["JMS"]},{"id":"jbossdeveloper_quickstart-ec93e82e","label":"numberguess","title":"numberguess: Example Using CDI and JSF","description":"The `numberguess` quickstart demonstrates the use of *CDI 1.0*  (Contexts and Dependency Injection) and *JSF 2.1* (JavaServer Faces) in JBoss EAP.","tags":["CDI","JSF"]},{"id":"jbossdeveloper_quickstart-19735541","label":"inter-app","title":"inter-app: Communicate Between Two Applications Using EJB and CDI","description":"The `inter-app` quickstart shows you how to use a shared API JAR and an EJB to provide inter-application communication between two WAR deployments.","tags":["CDI","EJB","JSF"]},{"id":"jbossdeveloper_quickstart-61ea7eff","label":"websocket-hello","title":"jboss-websocket-hello: A simple WebSocket application","description":"The `websocket-hello` quickstart demonstrates how to create a simple WebSocket application.","tags":["CDI","JSF","WebSocket"]},{"id":"jbossdeveloper_quickstart-941f8005","label":"servlet-security","title":"servlet-security:  Using Java EE Declarative Security to Control Servlet Access","description":"The `servlet-security` quickstart demonstrates the use of Java EE declarative security to control access to Servlets and Security in JBoss EAP.","tags":["Servlet","Security"]},]
;

$(function () {
  $search.keyup(function (e) {
  	if (e.keyCode == 27){
  		//Clear on ESC 
		$clearSearch.click();
		return;
  	} 
    toggleSearch();
  });

  // Clear Text Field
  $clearSearch.on('click', function() {
    $search.val('');
    toggleSearch();
  });
});

function toggleSearch(terms) {
  if (terms != null) {
  	$search.val(terms);
  }
  terms = $search.val().toLowerCase();
  var searching = Boolean( terms );
  if (!searching) {
    $search.val('').focus();
  }
  performSearch(terms);
  $searchBar.toggleClass('has-feedback', searching);
  $homeDiv.toggleClass('hidden', searching );
  $results.toggleClass('hidden', !searching );
}


function performSearch(terms) {
  results = filter(terms);
  var total = results.length;
  var eltPerPage = 4;
  console.log("Found "+total+" results");
  //reset paginator
  var $paginator = $('#pagination-results');
  $paginator.empty();
  $paginator.removeData('twbs-pagination');

  if (total > eltPerPage) {
    $paginator.twbsPagination({
          totalPages: Math.ceil(total/eltPerPage),
          visiblePages: 4,
          onPageClick: function (event, page) {
              displayPage(page, eltPerPage, terms);
          }
      });
  }
  displayPage(1, eltPerPage, terms);
}

function displayPage(page, eltPerPage, terms) {
  var $list = $("#resultList");
  $list.empty();

  var total = results.length;
  var totalPages = Math.ceil(total/eltPerPage);

  var $paginator = $("#pagination-results");
  $paginator.find(".first, .prev").toggleClass('hidden', (page == 1));
  $paginator.find(".next, .last").toggleClass('hidden', (page == totalPages));


  if (total > 0) {
    var start = (page-1)*eltPerPage;
    var size = eltPerPage;
    if (page == totalPages) {
      size = eltPerPage - (totalPages*eltPerPage-results.length);
    }
    try {
    	for (var i=start; i< (start+size);i++) {
    		var $div = result2Html(results[i]);
    		$div.find('p').highlight(terms);
    		$div.appendTo($list);
    	}
    	
    } catch (e) {
    	alert(e);
    }
  } else {
    $list.append("<div>No quickstarts match your criteria</div>");
  }
}

function filter(terms) {
  var filtered = [];
  var results = wizards.concat(searchResults);

  for (var i=0; i< results.length; i++) {
    var result = results[i];
    if ($.inArray(result.id, blacklist) > -1) {
      continue;
    }
    if (containsIgnoreCase(result.id, terms) 
     || containsIgnoreCase(result.description, terms)
     || tagsMatch(result, terms)) {
      filtered.push(result);
	}
  }
  return filtered;
}

function tagsMatch(result, target) {
	if (!result.hasOwnProperty('tags')) {
		return false;
	}
	for (var i=0; i < result.tags.length; i++) {
		var tag = result.tags[i];
		if (containsIgnoreCase(tag,":")) {
			tag = tag.split(":")[1];
		}
		if (tag != "central" && containsIgnoreCase(tag, target)) {
		 	return true;
		}
	}
	return false;
}


function containsIgnoreCase(value, target) {
	return value.toLowerCase().indexOf(target) > -1;
}



// Home - Popovers
// ==========================


$(function () {
  addPopover($('.popper'));
  
  var content = function () {
	  $content = $(this).next('.popper-content');
	  $checkbox = $content.find('.showOnStartup');
	  $checkbox.attr("checked", showOnStartup);
      return $content.html();
  };
  
  addPopover($('.settings'), 'auto left', 'click', content);
});


function closePopover(checkbox) {
	var $parent = $(checkbox).parent().parent().parent();
	setTimeout(function() {
	  $parent.popover('hide');
	}, 500);
	var show = checkbox.checked;
	if (show != showOnStartup) {
		showOnStartup = show;
		storeShowOnStartup();		
	}
}

function addPopover(element, placement, trigger, content) {
  if (placement == null) {
	  placement = 'auto bottom';
  }
  if (trigger == null) {
	  trigger = 'hover';
  }	
  if (content == null) {
	  content = function () {
	        return $(this).next('.popper-content').html();
	  };
  }
  element.popover({
    container: 'body',
    placement: placement,
    trigger: trigger,
    html: true,
    content: content
  });
}

function result2Html(result) {
  var iconUrl = result.hasOwnProperty('iconUrl')?result.iconUrl:"images/icon-default.png";
  var html = '<div href="#" class="list-group-item" data-project-type="';
  if (isQuickStart(result)) {
    html += 'quickstart';
  } else {
    html += 'wizard';
  }
  html += '" data-project-id="'+result.id+'">';
  html += '<a href="#" class="list-group-item-heading"><span class="i"><img src="'+iconUrl+'"></span>'+ result.label+ '</a>';
  html += '<p class="list-group-item-text">'+result.description+'</p>';
  html += buildTags(result)+'</div>';
  $qsDiv = $(html);


//  $qsTemplate = $("#quickstart-template").find("div");
//  $qsDiv = $qsTemplate.clone();
//  $qsDiv.attr('data-quickstart-id', result.id);
//  $qsDiv.find("a").html('<span class="i"><span class="i-default"></span></span>'+ result.id);
//  $qsDiv.find("p").html('<p class="list-group-item-text">'+result.description+'</p>');

  return $qsDiv;
}


function buildTags(result) {
	if (!result.hasOwnProperty('tags')) {
		return "";
	}
	var tags = '<ul class="tags list-inline">';
	for (var i=0; i< result.tags.length; i++) {
		var tag = result.tags[i].toLowerCase();
		var isRuntime = false;
		var tagValue = tag;
		var specialClass = "";
		if (containsIgnoreCase(tag,":")) {
		   var specialTag = tag.split(":");
		   specialClass = specialTag[0];
		   tagValue= specialTag[1];
		}
		
		if (tagValue != "central") {
			tags += '<li class="'+specialClass+'">'+tagValue.toUpperCase() +'</li>';	
		}
	}
	tags += '<ul>';
	return tags;
}

function loadBuzz(buzzFeed) {

  $buzz = $('#buzz');
  $buzzTemplate = $("#buzz").find("div.active").clone();
  //<div class="active item">
  //     <p>Brand new?  Try our <a href="http://www.jboss.org/ticket-monster/">TicketMonster</a> tutorial.</p>
  //</div>
  $buzzTemplate.removeClass('active');

  for (i=0; i < Math.min(10, buzzFeed.length); i++) {
    try {
      var f = buzzFeed[i];
      var $buzzDiv = $buzzTemplate.clone();
      //beware of html injection
      var content = '<p><a href="'+f.link+'" class="external">'+f.description+'</a><p>';
      $buzzDiv.html(content);
      $buzzDiv.appendTo($buzz);
    } catch(O_o) {
      console.log("Error loading buzz :"+O_o.message);
    }

  }
  $('#buzz-carousel').carousel({
    interval: 3500
  });
  //alert("buzz loaded");
}

function loadWizards(newWizards, newFavorites) {
  if (newWizards != null) {
	  wizards = newWizards;	  
  } 
  if (newFavorites != null) {
	  favorites = newFavorites;	  
  } 
  
  var elts = wizards.concat(favorites);
  
  var template = '<div class="col-md-3 col-sm-4 col-xs-6"><div class="list-group">'
            +   '<div class="list-group-item" data-project-id="@id@" data-project-type="@type@">'
            +     '<a href="#" class="list-group-item-heading popper" data-toggle="popover"><span class="i"><img src="@iconUrl@"></span>@title@</a>'
            +     '<div class="popper-content">'
            +       '<h4><img src="@iconUrl@">@title@</h4>'
            +       '<p>@description@</p>'
            +       '<p>@product@</p>'
            +     '</div>'
            +   '</div>'
            +'</div></div>';

  $wizards = $("#wizards .row");

  $wizards.empty();
  
  for (i=0; i < elts.length; i++) {
    var w = elts[i];
    var iconUrl = w.hasOwnProperty('iconUrl')?w.iconUrl:"images/icon-default.png";
    var html = replaceAll("@title@", w.label, template);
    	html = replaceAll("@type@", (isQuickStart(w)?'quickstart':'wizard'), html);    
    	html = replaceAll("@id@", w.id, html);
        html = replaceAll("@iconUrl@", iconUrl, html);
        html = replaceAll("@description@", w.description, html);
        html = replaceAll("@product@", getProduct(w), html);
    var $element = $(html);
    addPopover($element.find(".popper"));
    $element.appendTo($wizards);
  }
}

function getProduct(qs) {
	if (!qs.hasOwnProperty('tags')) {
		return "";
	}
	for (var i=0; i< qs.tags.length; i++) {
		var tag = qs.tags[i];
		if (containsIgnoreCase(tag, "product:")) {
			return "<em>Product: " +  tag.split(":")[1].toUpperCase() +"</em>";
		}
	}
	return "";
}

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function loadQuickstarts(data) {
  searchResults = data;
}

function loadFavorites(data) {
  favorites = data;
  loadWizards();
}

function registerQuickstartClicks() {
  $(document).on("click", "a.list-group-item-heading", function(e) {
    e.preventDefault();
    $(this).popover('hide');
    var id = $(this).parent().data("project-id");
    var type = $(this).parent().data("project-type");
    delegateToIDE(type, id);
    $clearSearch.click();
  });
}

function registerButtonClicks() {
  $("#addtools").on("click", function(e) {
    e.preventDefault();
    delegateToIDE('openpage', 'org.jboss.tools.central.editors.SoftwarePage');
  });
  if (typeof openInIDE == 'function' ){
    $(document).on("click", "a.external", function(e) {
      e.preventDefault();
      var href = $(this).attr('href');
      delegateToIDE('openlink', href);
    });
  }
}

function registerTagClicks() {
	$("#resultList").on("click", " ul.tags li", function(e) {
		var tag = $(this).text();
		toggleSearch(tag);
	});
}

function toggleEarlyAccess(enabled) {
  if (enabled) {
    $("#earlyaccess").show();
  } else {
    $("#earlyaccess").hide();
  }

}


function delegateToIDE(type, data) {
  if (typeof openInIDE == 'function' ){
    openInIDE(type, data);
  } else {
    alert(type + " : "+ data);
  }
}

function setShowOnStartup(show) {
	showOnStartup = show == 'true';
	$(".showOnStartup").attr("checked", showOnStartup);
}

function storeShowOnStartup() {
	delegateToIDE("showonstartup", showOnStartup);
}

function isQuickStart(data) {
	return data.hasOwnProperty('title');
}


// ==========================
$(document).ready(function() {
  //register events per html elements
  //registerProxyWizardClicks();
  registerQuickstartClicks();
  registerButtonClicks();
  registerTagClicks();
  //load elements from IDE
  if (typeof initialize == 'function' ){
    initialize();
  } else {
    loadWizards(wizards, favorites);
  }
  
  $('#search-form').submit (function() {return false;});
  
});


