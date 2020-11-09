COLOURED ?= 1

ifeq ($(COLOURED),1)
COLOUR = \e[1;34m # light blue
NO_COLOUR = \e[0m
endif

description = @printf "${COLOUR} \n\n===> $(1) \n\n${NO_COLOUR}"

!%:                              ; $(call description,Building target $/)

!bower:                          ; $(call description,Install bower components)
