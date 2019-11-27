package main

import (
	apiv1 "k8s.io/api/core/v1" // contains core information of set of yml
	//contains the meta information set of yml
	batchv1 "k8s.io/api/batch/v1"
	"k8s.io/client-go/kubernetes"
	testclient "k8s.io/client-go/kubernetes/fake"
	"k8s.io/client-go/rest"
)

// InClusterKubernetesClient struct to encapsulate k8s clienset and namespace name
type InClusterKubernetesClient struct {
	clientset kubernetes.Interface
	namespace string
}

// NewInClusterKubernetesClient to initialize clientset
func NewInClusterKubernetesClient() *InClusterKubernetesClient {
	client := &InClusterKubernetesClient{}
	client.init()
	return client
}

// NewInClusterTestKubernetesClient to initialize test clientset
func NewInClusterTestKubernetesClient() *InClusterKubernetesClient {
	client := &InClusterKubernetesClient{}
	client.clientset = testclient.NewSimpleClientset()
	client.SetDefaultNamespace()
	return client
}
func (client *InClusterKubernetesClient) init() {
	config, err := rest.InClusterConfig()
	if err != nil {
		panic(err.Error())
	}
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}
	client.clientset = clientset
	client.SetDefaultNamespace()
}

// SetDefaultNamespace to set namespace of InClusterKubernetesClient
func (client *InClusterKubernetesClient) SetDefaultNamespace() {
	client.namespace = apiv1.NamespaceDefault
}

// KubernetesClient interface
type KubernetesClient interface {
	createJob(Job *batchv1.Job) (*batchv1.Job, error)
	getNamespace() string
}

func (client *InClusterKubernetesClient) getNamespace() string {
	return client.namespace
}
func (client *InClusterKubernetesClient) createJob(job *batchv1.Job) (*batchv1.Job, error) {
	return client.clientset.BatchV1().Jobs(client.getNamespace()).Create(job)
}
