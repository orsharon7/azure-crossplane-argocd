

az aks get-credentials --name orrocrspln-aks --resource-group env-orrocrspln-31-1737614754-rg


kubectl apply -k argocd/install

###
1.  Patch the argocd-server service to be of type LoadBalancer:

kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'

2. Get the external IP of the argocd-server service:

kubectl get svc argocd-server -n argocd -o jsonpath='{.status.loadBalancer.ingress[0].ip}'

3. Retrieve the initial admin password:
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo


4. Login ArgoCD CLI into our argocd-server installed in AKS

argocd login $(kubectl get svc argocd-server -n argocd -o jsonpath='{.status.loadBalancer.ingress[0].ip}' ; echo) --username admin --password $(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo) --insecure

or

argocd login 172.188.212.150 --username admin --password $(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo) --insecure




kubectl apply -f argocd/crossplane-bootstrap/crossplane-helm-secret.yaml

kubectl apply -n argocd -f argocd/crossplane-bootstrap/crossplane.yaml


az ad sp create-for-rbac --sdk-auth --role Owner --scopes /subscriptions/<subscription-id> > azure-credentials.json

kubectl create secret \
generic azure-secret \
-n crossplane-system \
--from-file=creds=./azure-credentials.json


kubectl apply -f argocd/crossplane-bootstrap/crossplane-provider-azure.yaml

kubectl apply -f argocd/crossplane-bootstrap/crossplane-provider-azure-config.yaml


