pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                sh 'docker build -t case/webportal .'
                sh 'docker tag case/webportal master.cfc:8500/default/casewebportal:v0.0.1'
                sh 'cd chart; helm package casewebportal'
            }
        }
    }
}
