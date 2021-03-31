***REMOVED******REMOVED***/* vim: set filetype=mustache: */***REMOVED******REMOVED***
***REMOVED******REMOVED***/*
Expand the name of the chart.
*/***REMOVED******REMOVED***
***REMOVED******REMOVED***- define "greencompute-telco-app.name" -***REMOVED******REMOVED***
***REMOVED******REMOVED***- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -***REMOVED******REMOVED***
***REMOVED******REMOVED***- end -***REMOVED******REMOVED***

***REMOVED******REMOVED***/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/***REMOVED******REMOVED***
***REMOVED******REMOVED***- define "greencompute-telco-app.fullname" -***REMOVED******REMOVED***
***REMOVED******REMOVED***- if .Values.fullnameOverride -***REMOVED******REMOVED***
***REMOVED******REMOVED***- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -***REMOVED******REMOVED***
***REMOVED******REMOVED***- else -***REMOVED******REMOVED***
***REMOVED******REMOVED***- $name := default .Chart.Name .Values.nameOverride -***REMOVED******REMOVED***
***REMOVED******REMOVED***- if contains $name .Release.Name -***REMOVED******REMOVED***
***REMOVED******REMOVED***- .Release.Name | trunc 63 | trimSuffix "-" -***REMOVED******REMOVED***
***REMOVED******REMOVED***- else -***REMOVED******REMOVED***
***REMOVED******REMOVED***- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -***REMOVED******REMOVED***
***REMOVED******REMOVED***- end -***REMOVED******REMOVED***
***REMOVED******REMOVED***- end -***REMOVED******REMOVED***
***REMOVED******REMOVED***- end -***REMOVED******REMOVED***

***REMOVED******REMOVED***/*
Create chart name and version as used by the chart label.
*/***REMOVED******REMOVED***
***REMOVED******REMOVED***- define "greencompute-telco-app.chart" -***REMOVED******REMOVED***
***REMOVED******REMOVED***- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -***REMOVED******REMOVED***
***REMOVED******REMOVED***- end -***REMOVED******REMOVED***
