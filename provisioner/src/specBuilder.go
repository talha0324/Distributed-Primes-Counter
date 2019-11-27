package main

import (
	"crypto/sha1"
	"fmt"
	"strconv"

	batchv1 "k8s.io/api/batch/v1"
	apiv1 "k8s.io/api/core/v1"
	resource "k8s.io/apimachinery/pkg/api/resource"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// JobSpecBuilder struct to define some parameters for jobSpec
type JobSpecBuilder struct {
	imageNameTag    string
	imagePullSecret string
	requestMemory   string
	requestCPU      string
	// credsSecretName string
	backofflimit int32
	envVars      emesg
	commandToRun string
	serverURL    string
}

func (j *JobSpecBuilder) buildJobSpecs() *batchv1.Job {

	// verify if all the mandatory parameters are set
	if j.imageNameTag == "" ||
		j.imagePullSecret == "" ||
		j.requestMemory == "" ||
		j.requestCPU == "" ||
		// j.credsSecretName == "" ||
		j.backofflimit < 2 ||
		!j.envVars.isVerified() {
		return nil
	}

	const hashSize int = 40

	sha := sha1.New()
	sha.Write([]byte(fmt.Sprintf(`%ds+%d+%s`, j.envVars.From, j.envVars.Until, j.envVars.BatchID)))
	hash := fmt.Sprintf(`%x`, sha.Sum(nil))

	jobname := hash
	podname := hash
	imagename := "counter"

	var backofflimit int32
	backofflimit = j.backofflimit

	// var commandToRun string
	// if os.Getenv("RunMode") == "TEST" {
	// 	commandToRun = "start"
	// } else {
	// 	commandToRun = os.Args[3]
	// }
	// commandToRun = "start"
	// serverURL := os.Args[2]
	// For an example of how to create jobs, see this file:
	// https://github.com/pachyderm/pachyderm/blob/805e63/src/server/pps/server/api_server.go#L2320-L2345
	image := string(j.imageNameTag)
	fmt.Println("using image -->" + image)
	// credsSecret := j.credsSecretName
	pullSecret := string(j.imagePullSecret)
	cpu, e1 := resource.ParseQuantity(string(j.requestCPU))
	if e1 != nil {
		cpu, _ = resource.ParseQuantity("50m")
	}
	memory, e2 := resource.ParseQuantity(string(j.requestMemory))
	if e2 != nil {
		memory, _ = resource.ParseQuantity("100Mi")
	}
	batchJob := &batchv1.Job{
		TypeMeta: metav1.TypeMeta{
			Kind:       "Job",
			APIVersion: "v1",
		},
		ObjectMeta: metav1.ObjectMeta{
			Name:   jobname,
			Labels: make(map[string]string),
		},
		Spec: batchv1.JobSpec{
			// Optional: Parallelism:,
			// Optional: Completions:,
			// Optional: ActiveDeadlineSeconds:,
			// Optional: Selector:,
			// Optional: ManualSelector:,
			BackoffLimit: &backofflimit,
			Template: apiv1.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{
					Name:   podname,
					Labels: make(map[string]string),
				},
				Spec: apiv1.PodSpec{
					InitContainers: []apiv1.Container{}, // Doesn't seem obligatory(?)...
					Containers: []apiv1.Container{
						{
							Name:  imagename,
							Image: image,
							Resources: apiv1.ResourceRequirements{
								Requests: apiv1.ResourceList{
									apiv1.ResourceCPU:    cpu,
									apiv1.ResourceMemory: memory,
								},
							},
							SecurityContext: &apiv1.SecurityContext{},
							ImagePullPolicy: apiv1.PullPolicy(apiv1.PullIfNotPresent),
							Command: []string{
								"npm",
							},
							Args: []string{
								"run",
								j.commandToRun,
							},
							Env: []apiv1.EnvVar{
								{
									Name:  "FROM",
									Value: strconv.Itoa(int(j.envVars.From)),
								},
								{
									Name:  "TO",
									Value: strconv.Itoa(int(j.envVars.Until)),
								},
								{
									Name:  "WORKERBATCHID",
									Value: j.envVars.BatchID,
								},
								{
									Name:  "SERVERURL",
									Value: j.serverURL,
								},
								// {
								// 	Name: "username",
								// 	ValueFrom: &apiv1.EnvVarSource{
								// 		SecretKeyRef: &apiv1.SecretKeySelector{
								// 			LocalObjectReference: apiv1.LocalObjectReference{Name: credsSecret},
								// 			Key:                  "username",
								// 		},
								// 	},
								// },
								// {
								// 	Name: "password",
								// 	ValueFrom: &apiv1.EnvVarSource{
								// 		SecretKeyRef: &apiv1.SecretKeySelector{
								// 			LocalObjectReference: apiv1.LocalObjectReference{Name: credsSecret},
								// 			Key:                  "password",
								// 		},
								// 	},
								// },
							},
							// VolumeMounts: []apiv1.VolumeMount{
							// 	{
							// 		MountPath: mountPath,
							// 		Name:      volumeName,
							// 	},
							// },
						},
					},
					RestartPolicy: apiv1.RestartPolicyNever,
					// Volumes: []apiv1.Volume{
					// 	{
					// 		Name: volumeName,
					// 		VolumeSource: apiv1.VolumeSource{

					// 			PersistentVolumeClaim: &apiv1.PersistentVolumeClaimVolumeSource{
					// 				ClaimName: claimName,
					// 			},
					// 		},
					// 	},
					// },
					ImagePullSecrets: []apiv1.LocalObjectReference{{Name: pullSecret}},
				},
			},
		},
		// Optional, not used by pach: JobStatus:,
	}
	return batchJob
}
