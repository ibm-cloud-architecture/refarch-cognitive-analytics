set p = $(echo $PWD | awk -v h="scripts" '$0 ~h')
if [[ $PWD = */scripts ]]; then
 cd ..
fi
. ./scripts/setenv.sh
if [[ $(ls | grep chart) != chart ]]; then
echo "you need a chart folder with helm chart in it"
 exit
fi
echo $PWD

rc=$(helm ls --all $progname --tls)
if [[ ! -z "$rc" ]]; then
  rc=$(helm del --purge $progname --tls)
  if [[ "$rc" = *deleted ]]; then
    helm install --name $progname chart/$helmchart --namespace=$namespace --tls
  fi
else
  helm install --name $progname chart/$helmchart --namespace=$namespace --tls
fi
