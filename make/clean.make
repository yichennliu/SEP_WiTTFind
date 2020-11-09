distclean: $! gitclean

gitclean: $!
	@[[ -d .git ]] && \
	git clean -fdqx --exclude=results --exclude=facsimile
