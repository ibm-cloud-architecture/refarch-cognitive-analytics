podTemplate(label: 'mynode',
    volumes: [
        hostPathVolume(hostPath: '/etc/docker/certs.d', mountPath: '/etc/docker/certs.d'),
        hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock'),
        secretVolume(secretName: 'registry-account', mountPath: '/var/run/secrets/registry-account'),
        configMapVolume(configMapName: 'registry-config', mountPath: '/var/run/configs/registry-config')
    ],
    containers: [
        containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl', ttyEnabled: true, command: 'cat'),
        containerTemplate(name: 'docker' , image: 'docker:17.06.1-ce', ttyEnabled: true, command: 'cat')
  ])***REMOVED***

    node('mynode') ***REMOVED***
        checkout scm
        container('docker') ***REMOVED***
            stage('build app') ***REMOVED***
                sh """
                #!/bin/bash
                cd src
                npm install
                ng build
                """
            ***REMOVED***
            stage('Build Docker Image') ***REMOVED***
                sh """
                #!/bin/bash
                NAMESPACE=`cat /var/run/configs/registry-config/namespace`
                REGISTRY=`cat /var/run/configs/registry-config/registry`
                docker build -t \$***REMOVED***REGISTRY***REMOVED***/\$***REMOVED***NAMESPACE***REMOVED***/greenapp:$***REMOVED***env.BUILD_NUMBER***REMOVED*** .
                """
            ***REMOVED***
            stage('Push Docker Image to Registry') ***REMOVED***
                sh """
                #!/bin/bash
                NAMESPACE=`cat /var/run/configs/registry-config/namespace`
                REGISTRY=`cat /var/run/configs/registry-config/registry`
                set +x
                DOCKER_USER=`cat /var/run/secrets/registry-account/username`
                DOCKER_PASSWORD=`cat /var/run/secrets/registry-account/password`
                docker login -u=\$***REMOVED***DOCKER_USER***REMOVED*** -p=\$***REMOVED***DOCKER_PASSWORD***REMOVED*** \$***REMOVED***REGISTRY***REMOVED***
                set -x
                docker push \$***REMOVED***REGISTRY***REMOVED***/\$***REMOVED***NAMESPACE***REMOVED***/greenapp:$***REMOVED***env.BUILD_NUMBER***REMOVED***
                """
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***
***REMOVED***
